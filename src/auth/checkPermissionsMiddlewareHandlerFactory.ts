import type { MiddlewareHandler } from "hono";

import {
  forbidden,
  unauthorized,
} from "@meow-meow-dev/server-utilities/http/status";
import { type AccessTokenPayload } from "@meow-meow-dev/server-utilities/jwt";
import {
  accessTokenPayloadSchema,
  extractJWTPayload,
  extractScopes,
} from "@meow-meow-dev/server-utilities/jwt";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { getEnvironmentVariable } from "./getEnvironmentVariable.js";

export type AccessTokenFactoryFactoryProps<Scope extends string> = {
  accessTokenPayload: AccessTokenPayload;
  requiredScope: Scope;
  scopes: Scope[];
};

type CheckPermissionsProps<Scope extends string, AccessToken> = {
  accessTokenCookieName: string;
  accessTokenFactory: (
    props: AccessTokenFactoryFactoryProps<Scope>,
  ) => Promise<AccessToken | undefined>;
  requiredAudience: string;
};

export function checkPermissionsMiddlewareHandlerFactory<
  AccessToken,
  Scope extends string,
>({
  accessTokenCookieName,
  accessTokenFactory,
  requiredAudience,
}: CheckPermissionsProps<Scope, AccessToken>): (
  requiredScope: Scope,
) => MiddlewareHandler<{
  Variables: { accessToken: AccessToken };
}> {
  return (requiredScope) =>
    createMiddleware(async (c, next) => {
      let accessTokenPayload: AccessTokenPayload | undefined;

      const cookie = getCookie(c, accessTokenCookieName);
      if (cookie) {
        accessTokenPayload = await extractJWTPayload({
          cookie,
          schema: accessTokenPayloadSchema,
          secretKey: getEnvironmentVariable(c, "JWT_SECRET"),
        });
      }

      if (!accessTokenPayload) return unauthorized(c);

      const { aud: audience } = accessTokenPayload;
      const scopes = extractScopes(accessTokenPayload);
      if (
        !audience.includes(requiredAudience) ||
        !scopes.includes(requiredScope)
      )
        return forbidden(c);

      const accessToken = await accessTokenFactory({
        accessTokenPayload,
        requiredScope,
        scopes: scopes as Scope[],
      });
      if (accessToken == undefined) return forbidden(c);

      c.set("accessToken", accessToken);

      await next();
    });
}
