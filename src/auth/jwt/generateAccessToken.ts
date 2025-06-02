import type { SubjectFactory } from "#auth/jwt/types";
import type { AccessTokenPayload, WithoutJwtTimeStamps } from "#auth/jwt/types";
import type { UserRole } from "#types";

import { buildScope } from "./scope.js";

type GenerateAccessTokenProps = {
  apiAudience: string;
  issuer: string;
  scopes: readonly string[];
  subjectFactory: SubjectFactory;
  user: {
    activePlanSlug?: string;
    id: number;
    role: UserRole;
  };
};

export function generateAccessToken({
  apiAudience,
  issuer,
  scopes,
  subjectFactory,
  user: { activePlanSlug, id: userId, role },
}: GenerateAccessTokenProps): WithoutJwtTimeStamps<AccessTokenPayload> {
  const sub = subjectFactory(userId);

  return {
    active_plan_slug: activePlanSlug,
    aud: [apiAudience],
    iss: issuer,
    role,
    scope: buildScope(scopes),
    sub,
  };
}
