import type { DefaultSession } from "next-auth";

// Expose the user's database id on the session, so server code can scope
// per-user data (provider keys, and later chats/media) to the signed-in user.
// It's populated by the `session` callback in auth.ts (we use database sessions).
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
