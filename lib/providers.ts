// The AI providers a user can bring keys for, and a live check that a pasted
// key actually works. "Live validation" (per the BYOK spec) means we make one
// cheap authenticated request to the provider before storing the key — so a
// typo'd or revoked key is rejected up front instead of failing later.

export type Provider = "openrouter" | "atlascloud";

export const PROVIDERS: Provider[] = ["openrouter", "atlascloud"];

export function isProvider(value: unknown): value is Provider {
  return value === "openrouter" || value === "atlascloud";
}

export type ValidationResult = { ok: true } | { ok: false; error: string };

// Endpoints chosen to be authenticated but cheap (no generation cost):
// - OpenRouter: GET /api/v1/key returns the key's own limits/usage.
// - AtlasCloud: GET /api/v1/models — a simple authenticated read. (Confirm this
//   is the right lightweight check against AtlasCloud's docs — see the BYOK
//   spec's open questions; verified when testing with a real key.)
export async function validateKey(
  provider: Provider,
  key: string,
): Promise<ValidationResult> {
  const endpoints: Record<Provider, string> = {
    openrouter: "https://openrouter.ai/api/v1/key",
    atlascloud: "https://api.atlascloud.ai/api/v1/models",
  };
  const label = provider === "openrouter" ? "OpenRouter" : "AtlasCloud";

  try {
    const res = await fetch(endpoints[provider], {
      headers: { Authorization: `Bearer ${key}` },
      // Don't let a slow provider hang the server action (Vercel caps functions
      // at 60s); fail fast into the friendly catch below instead.
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return { ok: true };
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: `${label} rejected this key.` };
    }
    return { ok: false, error: `${label} check failed (HTTP ${res.status}).` };
  } catch {
    return {
      ok: false,
      error: `Couldn't reach ${label} to validate the key. Try again.`,
    };
  }
}
