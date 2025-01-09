import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/~validation";
import * as v from "valibot";

import { jwtTimestampsSchema } from "./accessTokenPayload.js";

export const accessTokenPayloadSchema = v.pipe(
  v.strictObject({
    ...jwtTimestampsSchema.entries,
    aud: v.pipe(v.array(v.pipe(v.string(), v.nonEmpty())), v.minLength(1)),
    iss: nonEmptyStringSchema,
    scope: nonEmptyStringSchema,
    sub: v.pipe(v.string(), v.transform(Number)),
  }),
);

export type AccessToken = v.InferOutput<typeof accessTokenPayloadSchema>;

export function extractScopes({ scope }: AccessToken): string[] {
  return scope.split(" ");
}
