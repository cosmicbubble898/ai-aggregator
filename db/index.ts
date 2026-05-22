// The database connection (Drizzle ORM over Neon's serverless driver).
//
// DATABASE_URL points at the STAGING database locally and on preview deploys,
// and at the PRODUCTION database in production (see ADR-0008).
//
// The fallback URL only kicks in during `next build` (e.g. in CI), where
// DATABASE_URL isn't set: neon() merely *constructs* a client — it doesn't
// open a connection — so the build never needs a real database. At runtime the
// real DATABASE_URL is always present, so the fallback is never used there.
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(
  process.env.DATABASE_URL ?? "postgresql://build:build@localhost:5432/build",
);

export const db = drizzle(sql, { schema });
