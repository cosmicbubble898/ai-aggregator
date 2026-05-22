// The OAuth endpoints (sign-in, callback, sign-out, etc.) live here.
// Auth.js generates them; we just expose its GET/POST handlers at
// /api/auth/* — this is the path Google redirects back to after login.
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
