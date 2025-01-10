import { CookieOptions } from "hono/utils/cookie";

export function getHTTPOnlyCookieOptions(): CookieOptions {
  // eslint-disable-next-line n/no-process-env
  const { MODE, VITEST } = process.env;

  const isDevelopment = MODE === "development";
  const isVitest = VITEST !== undefined;

  return {
    httpOnly: !isVitest,
    sameSite: isDevelopment ? "lax" : "strict",
    secure: isDevelopment,
  } as const;
}
