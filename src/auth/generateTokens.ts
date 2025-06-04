import type {
  AccessTokenPayload,
  Duration,
  WithoutJwtTimeStamps,
} from "#auth/jwt/types";

import { addJwtPayloadTimestamps, seconds, weeks } from "#auth/jwt/timestamps";
import { sign } from "hono/jwt";

export type GenerateTokensReturn = {
  accessToken: string;
  idToken: string;
};

type GenerateTokensProps = {
  accesstokenExpiry?: Duration;
  accessTokenPayload: WithoutJwtTimeStamps<AccessTokenPayload>;
  idTokenExpiry?: Duration;
  idTokenPayload: Record<string, unknown>;
  secret: string;
};

export async function generateTokens({
  accesstokenExpiry = weeks(1),
  accessTokenPayload,
  idTokenExpiry = seconds(30),
  idTokenPayload,
  secret,
}: GenerateTokensProps): Promise<GenerateTokensReturn> {
  const [accessToken, idToken] = await Promise.all([
    sign(
      addJwtPayloadTimestamps(accessTokenPayload, {
        expiry: accesstokenExpiry,
      }),
      secret,
    ),
    sign(
      addJwtPayloadTimestamps(idTokenPayload, { expiry: idTokenExpiry }),
      secret,
    ),
  ]);

  return { accessToken, idToken };
}
