import type { Context } from "hono";

import { setCookie } from "hono/cookie";

import { getHTTPOnlyCookieOptions } from "./getHTTPOnlyCookieOptions.js";

type SetHTTPOnlyCookieProps = {
  c: Context;
  cookieName: string;
  cookieString: string;
};

export function setHTTPOnlyCookie({
  c,
  cookieName,
  cookieString,
}: SetHTTPOnlyCookieProps): void {
  setCookie(c, cookieName, cookieString, getHTTPOnlyCookieOptions());
}
