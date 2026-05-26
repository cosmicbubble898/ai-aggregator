// Symmetric encryption for secrets we must store but never expose (provider API
// keys). Uses AES-256-GCM — "authenticated" encryption: it both hides the value
// and detects tampering (via an auth tag verified on decrypt). See ADR-0010.
//
// The master key lives ONLY in the environment (ENCRYPTION_KEY), never in the
// database or the repo. It's a 32-byte key, base64-encoded. Importing Node's
// `crypto` also means this module can only run server-side.
import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  type CipherGCMTypes,
} from "crypto";

const ALGORITHM: CipherGCMTypes = "aes-256-gcm";
const IV_BYTES = 12; // standard nonce length for GCM

export type Encrypted = {
  ciphertext: string; // base64
  iv: string; // base64
  authTag: string; // base64
};

// Read + validate the master key lazily, so a missing key fails loudly at the
// moment it's needed (not at import time, which would break the build).
function getMasterKey(): Buffer {
  const encoded = process.env.ENCRYPTION_KEY;
  if (!encoded) {
    throw new Error("ENCRYPTION_KEY is not set.");
  }
  const key = Buffer.from(encoded, "base64");
  if (key.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be 32 bytes, base64-encoded.");
  }
  return key;
}

export function encrypt(plaintext: string): Encrypted {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, getMasterKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
  };
}

export function decrypt({ ciphertext, iv, authTag }: Encrypted): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    getMasterKey(),
    Buffer.from(iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(authTag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "base64")),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
}
