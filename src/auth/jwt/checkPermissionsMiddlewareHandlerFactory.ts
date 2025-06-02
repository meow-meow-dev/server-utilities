import type { MiddlewareHandler } from "hono";

import { toHttpError } from "#neverthrow/error";
import { getEnvironmentVariable } from "#neverthrow/hono";
import { createMiddleware } from "hono/factory";

import type { Requirements } from "./checkAccessTokenPermissions.js";

import { checkAccessTokenPermissions } from "./checkAccessTokenPermissions.js";

type CheckPermissionsProps = {
  requirements: Requirements<string>;
  subjectPrefix: string;
};

export function checkPermissionsMiddlewareHandlerFactory({
  requirements,
  subjectPrefix,
}: CheckPermissionsProps): MiddlewareHandler<{
  Variables: { authentication: { userId: number } };
}> {
  return createMiddleware(async (c, next) => {
    const response = await getEnvironmentVariable(c, "JWT_SECRET")
      .asyncAndThen((jwtSecret) =>
        checkAccessTokenPermissions({
          context: c,
          jwtSecret,
          requirements,
          subjectPrefix,
        }),
      )
      .match((userId): undefined => {
        c.set("authentication", { userId });
      }, toHttpError(c));

    if (response) return response;

    await next();
  });
}
