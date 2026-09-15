import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createBase } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/** Session-aware client (respects RLS; used for admin pages and public reads). */
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // called from a Server Component — middleware refreshes the session instead
          }
        },
      },
    }
  );
}

/** Service-role client — server only. Used for public form inserts. */
export function createAdminClient() {
  return createBase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
