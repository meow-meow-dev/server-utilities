import type { Context } from "hono";
import type { Result } from "neverthrow";

import { getCookie } from "hono/cookie";
import { err, ok } from "neverthrow";

export type ExtractRefreshTokenFromCookiesProps = {
  c: Context;
  cookieName: string;
};

export function extractRefreshTokenFromCookies({
  c,
  cookieName,
}: ExtractRefreshTokenFromCookiesProps): Result<string, "unauthorized"> {
  const cookie = getCookie(c, cookieName);

  return cookie === undefined ? err("unauthorized") : ok(cookie);
}
