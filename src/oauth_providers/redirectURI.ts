import type { Context, Env, Input } from "hono";

import { replaceSearchParams } from "@meow-meow-dev/server-utilities/~http/search_params";

export function buildRedirectURI<
  E extends Env,
  P extends string,
  I extends Input,
>(c: Context<E, P, I>): string | undefined {
  const redirectTo = c.req.query("redirect_to");

  return redirectTo
    ? replaceSearchParams(c.req.url, { redirect_to: redirectTo })
    : undefined;
}

export function retrieveRedirectFromParams<
  E extends Env & { Variables: { "redirect-to": string | undefined } },
  P extends string,
  I extends Input,
>(c: Context<E, P, I>): void {
  const redirectTo = c.req.query("redirect_to");
  if (redirectTo) c.set("redirect-to", redirectTo);
}
