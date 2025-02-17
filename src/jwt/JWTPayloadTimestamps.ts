import { integerSchema } from "@meow-meow-dev/server-utilities/validation";
import * as v from "valibot";

import { type Duration, durationToSeconds } from "./duration.js";

export const jwtPayloadTimestampsSchema = v.strictObject({
  exp: integerSchema,
  iat: integerSchema,
  nbf: integerSchema,
});

export type JWTPayloadTimestamps = v.InferOutput<
  typeof jwtPayloadTimestampsSchema
>;

export type WithJWTTimeStamps<P extends Record<string, unknown>> =
  JWTPayloadTimestamps & P;

export type WithoutJWTTimeStamps<P extends JWTPayloadTimestamps> = Omit<
  P,
  keyof JWTPayloadTimestamps
>;

type BuildJWTPayloadTimestampsProps = {
  expiry: Duration;
};

export function addJWTPayloadTimestamps<P extends Record<string, unknown>>(
  payload: P,
  options: BuildJWTPayloadTimestampsProps,
): JWTPayloadTimestamps & P {
  return {
    ...payload,
    ...buildJWTPayloadTimestamps(options),
  };
}

export function buildJWTPayloadTimestamps({
  expiry,
}: BuildJWTPayloadTimestampsProps): JWTPayloadTimestamps {
  const iat = Math.floor(Date.now() / 1000); // number of seconds since epoch
  const exp = iat + durationToSeconds(expiry);

  return {
    exp,
    iat,
    nbf: iat,
  };
}
