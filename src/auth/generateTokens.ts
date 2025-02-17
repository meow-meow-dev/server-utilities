import {
  AccessTokenPayload,
  addJWTPayloadTimestamps,
  Duration,
  seconds,
  weeks,
  WithoutJWTTimeStamps,
} from "@meow-meow-dev/server-utilities/jwt";
import { sign } from "hono/jwt";

export type GenerateTokensReturn = {
  accessToken: string;
  idToken: string;
};

type GenerateTokensProps = {
  accesstokenExpiry?: Duration;
  accessTokenPayload: WithoutJWTTimeStamps<AccessTokenPayload>;
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
      addJWTPayloadTimestamps(accessTokenPayload, {
        expiry: accesstokenExpiry,
      }),
      secret,
    ),
    sign(
      addJWTPayloadTimestamps(idTokenPayload, { expiry: idTokenExpiry }),
      secret,
    ),
  ]);

  return { accessToken, idToken };
}
