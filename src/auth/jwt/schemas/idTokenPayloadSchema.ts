import { userRoleSchema } from "#schemas";
import * as v from "valibot";

import { jwtPayloadTimestampsSchema } from "./jwtPayloadTimestampsSchema.js";
import { standardIdTokenClaimsSchemas } from "./standardIdTokenClaimsSchemas.js";

export const idTokenPayloadSchema = v.strictObject({
  ...jwtPayloadTimestampsSchema.entries,
  email: standardIdTokenClaimsSchemas.email,
  family_name: standardIdTokenClaimsSchemas.family_name,
  given_name: standardIdTokenClaimsSchemas.given_name,
  role: userRoleSchema,
  sub: standardIdTokenClaimsSchemas.sub,
});
