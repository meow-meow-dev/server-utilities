import type { Context } from "hono";

import { getHTTPOnlyCookieOptions } from "@meow-meow-dev/server-utilities/~cookie";
import { setCookie } from "hono/cookie";

type SetHTTPOnlyCookieProps<> = {
  c: Context;
  cookieName: string;
  cookieString: string;
};

export function setHTTPOnlyCookie({
  c,
  cookieName,
  cookieString,
}: SetHTTPOnlyCookieProps): void {
  setCookie(
    c,
    cookieName,
    cookieString,
    getHTTPOnlyCookieOptions({
      development: import.meta.env.MODE === "development",
      vitest: import.meta.env.VITEST,
    }),
  );
}
