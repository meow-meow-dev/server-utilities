import type { Context } from "hono";

export function setRedirectionParameters(
  c: Context,
  url: URL,
  idToken: string,
): string {
  const result = new URL(url);

  result.searchParams.set("id_token", idToken);

  const redirectTo = c.get("redirect-to");
  if (redirectTo) result.searchParams.set("redirect_to", redirectTo);

  return result.href;
}
