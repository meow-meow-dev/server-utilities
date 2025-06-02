import type {
  BadRequest,
  Forbidden,
  InternalServerError,
  Unauthorized,
} from "#neverthrow/types";
import type { UserRole } from "#types";
import type { Context } from "hono";

import { forbiddenErr } from "#neverthrow/error";
import { ResultAsync } from "neverthrow";

import { extractAccessTokenPayload } from "./extractAccessTokenPayload.js";
import { extractScopes } from "./scope.js";
import { extractUserIdFromSubject } from "./subject.js";

export type Requirements<Scope extends string> = {
  audience: string;
  plan?: string;
  role: UserRole;
  scope: Scope;
};

type CheckAccessTokenPermissionsProps<Scope extends string> = {
  context: Context;
  jwtSecret: string;
  requirements: Requirements<Scope>;
  subjectPrefix: string;
};

export function checkAccessTokenPermissions<Scope extends string = string>({
  context,
  jwtSecret,
  requirements,
  subjectPrefix,
}: CheckAccessTokenPermissionsProps<Scope>): ResultAsync<
  number,
  BadRequest | Forbidden | InternalServerError | Unauthorized
> {
  return extractAccessTokenPayload({
    context,
    jwtSecret,
  }).andThen((accessTokenPayload) => {
    const { active_plan_slug, aud: audience, role } = accessTokenPayload;
    const scopes = extractScopes(accessTokenPayload);
    if (
      !audience.includes(requirements.audience) ||
      !scopes.includes(requirements.scope) ||
      role !== requirements.role ||
      (requirements.plan !== undefined &&
        active_plan_slug !== requirements.plan)
    )
      return forbiddenErr();

    const { sub } = accessTokenPayload;

    return extractUserIdFromSubject(subjectPrefix, sub);
  });
}
