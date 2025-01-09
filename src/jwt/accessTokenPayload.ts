import {
  integerSchema,
  nonEmptyStringSchema,
} from "@meow-meow-dev/server-utilities/~validation";
import * as v from "valibot";

export const jwtTimestampsSchema = v.strictObject({
  exp: integerSchema,
  iat: integerSchema,
  nbf: integerSchema,
});

export type JWTTimestamps = v.InferOutput<typeof jwtTimestampsSchema>;

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
