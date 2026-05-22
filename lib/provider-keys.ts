// Server-only logic for storing and retrieving a user's provider API keys.
// It encrypts/decrypts (lib/crypto) and talks to the database (db), so it must
// never be imported into client code. Callers (server actions, route handlers)
// pass the signed-in user's id; this module enforces per-user scoping.
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { providerKeys } from "@/db/schema";
import { encrypt, decrypt } from "@/lib/crypto";
import { validateKey, type Provider, type ValidationResult } from "@/lib/providers";

export type KeyStatus = { connected: boolean; hint?: string };

// What the browser is allowed to know: connected or not, plus a last-4 hint.
// Never the key itself.
export async function listProviderKeys(
  userId: string,
): Promise<Record<Provider, KeyStatus>> {
  const rows = await db
    .select({ provider: providerKeys.provider, keyHint: providerKeys.keyHint })
    .from(providerKeys)
    .where(eq(providerKeys.userId, userId));

  const status: Record<Provider, KeyStatus> = {
    openrouter: { connected: false },
    atlascloud: { connected: false },
  };
  for (const row of rows) {
    if (row.provider === "openrouter" || row.provider === "atlascloud") {
      status[row.provider] = { connected: true, hint: row.keyHint };
    }
  }
  return status;
}

// Validate the key with the provider, then encrypt + upsert it (one row per
// user+provider). Returns the validation result so the caller can surface a
// clear message; an invalid key is never stored.
export async function saveProviderKey(
  userId: string,
  provider: Provider,
  rawKey: string,
): Promise<ValidationResult> {
  const key = rawKey.trim();

  const check = await validateKey(provider, key);
  if (!check.ok) return check;

  const { ciphertext, iv, authTag } = encrypt(key);
  // Only ever expose the last 4 chars (and only if the key is long enough that
  // those 4 chars can't be the whole key) — keeps the hint a deliberate,
  // low-risk leak per ADR-0010.
  const keyHint = key.length > 4 ? key.slice(-4) : "••••";
  const now = new Date();
  await db
    .insert(providerKeys)
    .values({
      userId,
      provider,
      ciphertext,
      iv,
      authTag,
      keyHint,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [providerKeys.userId, providerKeys.provider],
      set: { ciphertext, iv, authTag, keyHint, updatedAt: now },
    });

  return { ok: true };
}

export async function removeProviderKey(
  userId: string,
  provider: Provider,
): Promise<void> {
  await db
    .delete(providerKeys)
    .where(
      and(eq(providerKeys.userId, userId), eq(providerKeys.provider, provider)),
    );
}

// Decrypt a stored key for server-side use (e.g. when a future generation
// feature calls the provider). Returns null if the user has no key for it.
export async function getDecryptedKey(
  userId: string,
  provider: Provider,
): Promise<string | null> {
  const [row] = await db
    .select()
    .from(providerKeys)
    .where(
      and(eq(providerKeys.userId, userId), eq(providerKeys.provider, provider)),
    )
    .limit(1);
  if (!row) return null;
  try {
    return decrypt({
      ciphertext: row.ciphertext,
      iv: row.iv,
      authTag: row.authTag,
    });
  } catch {
    // The row can't be decrypted — almost always because ENCRYPTION_KEY was
    // changed/lost (ADR-0010). Treat it as "no usable key" rather than throwing
    // into the caller; the user can re-enter the key.
    return null;
  }
}
