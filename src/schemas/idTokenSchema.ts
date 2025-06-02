import { jwtPayloadTimestampsSchema, standardIdTokenClaimsSchemas } from "#jwt";
import * as v from "valibot";

import { userRoleSchema } from "./userRoleSchema.js";

export const idTokenSchema = v.strictObject({
  ...jwtPayloadTimestampsSchema.entries,
  email: standardIdTokenClaimsSchemas.email,
  family_name: standardIdTokenClaimsSchemas.family_name,
  given_name: standardIdTokenClaimsSchemas.given_name,
  role: userRoleSchema,
  sub: standardIdTokenClaimsSchemas.sub,
});
