import type { Duration, JwtPayloadTimestamps } from "#auth/jwt/types";

import { durationToSeconds } from "./duration.js";
import { toJwtTimestamp } from "./toJwtTimestamp.js";

type BuildJwtPayloadTimestampsProps =
  | {
      exp: number;
      iat: number;
    }
  | {
      expiry: Duration;
    };

export function addJwtPayloadTimestamps<P extends Record<string, unknown>>(
  payload: P,
  options: BuildJwtPayloadTimestampsProps,
): JwtPayloadTimestamps & P {
  return {
    ...payload,
    ...buildJwtPayloadTimestamps(options),
  };
}

export function buildJwtPayloadTimestamps(
  props: BuildJwtPayloadTimestampsProps,
): JwtPayloadTimestamps {
  if ("expiry" in props) {
    const { expiry } = props;
    const iat = toJwtTimestamp(new Date());
    const exp = iat + durationToSeconds(expiry);

    return {
      exp,
      iat,
      nbf: iat,
    };
  } else {
    const { exp, iat } = props;

    return {
      exp,
      iat,
      nbf: iat,
    };
  }
}
