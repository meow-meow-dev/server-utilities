import type {
  AccessTokenPayload,
  Duration,
  IdTokenPayload,
  RefreshTokenPayload,
  WithoutJwtTimeStamps,
} from "#auth/jwt/types";
import type { InternalServerError } from "#neverthrow/types";

import { addJwtPayloadTimestamps, seconds, weeks } from "#auth/jwt/timestamps";
import { signFactory } from "#neverthrow/jwt";
import { okAsync, ResultAsync } from "neverthrow";

export type GenerateTokensReturn = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
};

type SignTokensProps = {
  accesstokenExpiry?: Duration;
  accessTokenPayload: WithoutJwtTimeStamps<AccessTokenPayload>;
  idTokenExpiry?: Duration;
  idTokenPayload: WithoutJwtTimeStamps<IdTokenPayload>;
  refreshTokenPayload: RefreshTokenPayload; // Include timestamps as they're saved in database
  secret: string;
};

export function signTokens({
  accesstokenExpiry = weeks(1),
  accessTokenPayload,
  idTokenExpiry = seconds(30),
  idTokenPayload,
  refreshTokenPayload,
  secret,
}: SignTokensProps): ResultAsync<GenerateTokensReturn, InternalServerError> {
  const sign = signFactory(secret);

  return ResultAsync.combine([
    sign(
      addJwtPayloadTimestamps(accessTokenPayload, {
        expiry: accesstokenExpiry,
      }),
    ),
    sign(addJwtPayloadTimestamps(idTokenPayload, { expiry: idTokenExpiry })),
    sign(addJwtPayloadTimestamps(refreshTokenPayload, refreshTokenPayload)),
  ]).andThen(([accessToken, idToken, refreshToken]) =>
    okAsync({ accessToken, idToken, refreshToken }),
  );
}
