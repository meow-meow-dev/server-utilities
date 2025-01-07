import type { OAuthVariables } from "@hono/oauth-providers";

import { facebookAuth as facebookAuthBase } from "@hono/oauth-providers/facebook";

import { buildRedirectURI, retrieveRedirectFromParams } from "./redirectURI.js";

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap extends OAuthVariables {
    "redirect-to": string | undefined;
  }
}

export const facebookAuth: typeof facebookAuthBase = (options) => {
  return (c, next) => {
    retrieveRedirectFromParams(c);

    return facebookAuthBase({
      ...options,
      redirect_uri: buildRedirectURI(c),
    })(c, next);
  };
};
