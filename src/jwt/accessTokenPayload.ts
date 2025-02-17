import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation";
import * as v from "valibot";

import { jwtPayloadTimestampsSchema } from "./JWTPayloadTimestamps.js";

export const accessTokenPayloadSchema = v.strictObject({
  ...jwtPayloadTimestampsSchema.entries,
  aud: v.pipe(v.array(v.pipe(v.string(), v.nonEmpty())), v.minLength(1)),
  iss: nonEmptyStringSchema,
  scope: nonEmptyStringSchema,
  sub: nonEmptyStringSchema,
});

export type AccessTokenPayload = v.InferOutput<typeof accessTokenPayloadSchema>;

export function extractScopes({ scope }: AccessTokenPayload): string[] {
  return scope.split(" ");
}
