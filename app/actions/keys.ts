"use server";

// Server actions the /settings form calls to add/replace/remove provider keys.
// Each action re-checks the session (never trust the client for the user id)
// and delegates the real work to the server-only lib/provider-keys module.
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { saveProviderKey, removeProviderKey } from "@/lib/provider-keys";
import { isProvider } from "@/lib/providers";

export type KeyActionState = { error?: string; success?: string };

export async function saveKeyAction(
  _prev: KeyActionState,
  formData: FormData,
): Promise<KeyActionState> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };

  const provider = formData.get("provider");
  if (!isProvider(provider)) return { error: "Unknown provider." };

  const key = (formData.get("key") ?? "").toString().trim();
  if (!key) return { error: "Please paste a key." };
  if (provider === "openrouter" && !key.startsWith("sk-or-")) {
    return { error: 'OpenRouter keys start with "sk-or-".' };
  }

  const result = await saveProviderKey(session.user.id, provider, key);
  if (!result.ok) return { error: result.error };

  revalidatePath("/settings");
  return { success: "Key saved." };
}

export async function removeKeyAction(
  _prev: KeyActionState,
  formData: FormData,
): Promise<KeyActionState> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };

  const provider = formData.get("provider");
  if (!isProvider(provider)) return { error: "Unknown provider." };

  await removeProviderKey(session.user.id, provider);
  revalidatePath("/settings");
  return { success: "Key removed." };
}
