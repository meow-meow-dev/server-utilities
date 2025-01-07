import { CookieOptions } from "hono/utils/cookie";

export function getHTTPOnlyCookieOptions(): CookieOptions {
  const vitest = import.meta.env.VITEST !== undefined;

  const isDevelopment = import.meta.env.MODE === "development" || vitest;

  return {
    httpOnly: !vitest,
    sameSite: isDevelopment ? "lax" : "strict",
    secure: !isDevelopment,
  } as const;
}
