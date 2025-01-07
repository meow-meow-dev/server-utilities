import type { OAuthVariables } from "@hono/oauth-providers";

import { googleAuth as googleAuthBase } from "@hono/oauth-providers/google";

import {
  buildRedirectState,
  retrieveRedirectFromState,
} from "./redirectState.js";

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap extends OAuthVariables {
    "redirect-to": string | undefined;
  }
}

export const googleAuth: typeof googleAuthBase = (options) => {
  return (c, next) => {
    retrieveRedirectFromState(c);

    return googleAuthBase({
      ...options,
      state: buildRedirectState(c),
    })(c, next);
  };
};
