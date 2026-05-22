// Auth.js (NextAuth v5) configuration — Google sign-in, backed by our database.
//
// Reads these env vars (see .env.example; values live in .env.local + Vercel):
//   AUTH_SECRET        — signs the session cookie
//   AUTH_GOOGLE_ID     — Google OAuth client ID
//   AUTH_GOOGLE_SECRET — Google OAuth client secret
// Auth.js picks those up by name automatically, so the Google() provider needs
// no explicit config.
//
// The DrizzleAdapter stores users/sessions in Postgres (Neon), so a signed-in
// user is a real row we can attach their keys, chats, and media to later.
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
});
