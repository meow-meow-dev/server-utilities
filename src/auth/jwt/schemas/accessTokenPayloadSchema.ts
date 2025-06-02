import { userRoleSchema } from "#schemas";
import { nonEmptyStringSchema } from "#validation";
import * as v from "valibot";

import { jwtPayloadTimestampsSchema } from "./jwtPayloadTimestampsSchema.js";

export const accessTokenPayloadSchema = v.strictObject({
  ...jwtPayloadTimestampsSchema.entries,
  active_plan_slug: v.optional(nonEmptyStringSchema),
  aud: v.pipe(v.array(v.pipe(v.string(), v.nonEmpty())), v.minLength(1)),
  iss: nonEmptyStringSchema,
  role: userRoleSchema,
  scope: nonEmptyStringSchema,
  sub: nonEmptyStringSchema,
});
