import { integerSchema } from "@meow-meow-dev/server-utilities/~validation";
import * as v from "valibot";

export const jwtPayloadTimestampsSchema = v.strictObject({
  exp: integerSchema,
  iat: integerSchema,
  nbf: integerSchema,
});

export type JWTPayloadTimestamps = v.InferOutput<
  typeof jwtPayloadTimestampsSchema
>;

type BuildJWTPayloadTimestamps = {
  expiryInSeconds: number;
};

export function buildJWTPayloadTimestamps({
  expiryInSeconds,
}: BuildJWTPayloadTimestamps): JWTPayloadTimestamps {
  const iat = Math.floor(Date.now() / 1000); // number of seconds since epoch
  const exp = iat + expiryInSeconds;

  return {
    exp,
    iat,
    nbf: iat,
  };
}
