import type { Context, TypedResponse } from "hono";

import { setHTTPOnlyCookie } from "#cookie";
import { internalServerError } from "#http/status";

import type { GenerateTokensReturn } from "./generateTokens.js";

import { setRedirectionParameters } from "./setRedirectionParameters.js";

type HandleRedirectionProps = {
  accessTokenCookieName: string;
  c: Context;
  redirectURL: URL;
  tokens: GenerateTokensReturn | undefined;
};

export function handleRedirection({
  accessTokenCookieName,
  c,
  redirectURL,
  tokens,
}: HandleRedirectionProps): Response &
  (
    | TypedResponse<"Internal Server Error", 500, "text">
    | TypedResponse<undefined, 302, "redirect">
  ) {
  if (tokens) {
    const { accessToken, idToken } = tokens;

    setHTTPOnlyCookie({
      c,
      cookieName: accessTokenCookieName,
      cookieString: accessToken,
    });

    return c.redirect(setRedirectionParameters(c, redirectURL, idToken));
  } else {
    return internalServerError(c);
  }
}
