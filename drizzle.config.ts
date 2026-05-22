// Config for drizzle-kit — the tool that turns our schema (db/schema.ts) into
// real tables in the database. Run with the staging DATABASE_URL when developing.
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
