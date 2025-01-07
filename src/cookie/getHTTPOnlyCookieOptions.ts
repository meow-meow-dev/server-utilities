import { CookieOptions } from "hono/utils/cookie";

type GetHTTPOnlyCookieOptionsProps = {
  development: boolean;
  vitest: boolean;
};

export function getHTTPOnlyCookieOptions({
  development,
  vitest,
}: GetHTTPOnlyCookieOptionsProps): CookieOptions {
  return {
    httpOnly: !vitest,
    sameSite: development ? "lax" : "strict",
    secure: !development,
  } as const;
}
