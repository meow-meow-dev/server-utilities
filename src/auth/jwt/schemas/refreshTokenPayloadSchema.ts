import { jwtPayloadTimestampsSchema } from "#auth/jwt/schemas";
import { nonEmptyStringSchema } from "#validation";
import * as v from "valibot";

export const refreshTokenPayloadSchema = v.strictObject({
  ...jwtPayloadTimestampsSchema.entries,
  jti: nonEmptyStringSchema,
  sub: nonEmptyStringSchema,
});
