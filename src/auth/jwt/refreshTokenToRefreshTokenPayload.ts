import type {
  RefreshToken,
  RefreshTokenPayload,
  SubjectFactory,
} from "#auth/jwt/types";

import { toJwtTimestamp } from "#auth/jwt/timestamps";

type RefreshTokenToRefreshTokenPayloadProps = {
  refreshToken: RefreshToken;
  subjectFactory: SubjectFactory;
};

export function refreshTokenToRefreshTokenPayload({
  refreshToken: { creationDate, expiryDate, tokenId, userId },
  subjectFactory,
}: RefreshTokenToRefreshTokenPayloadProps): RefreshTokenPayload {
  const iat = toJwtTimestamp(creationDate);

  return {
    exp: toJwtTimestamp(expiryDate),
    iat: toJwtTimestamp(creationDate),
    jti: tokenId,
    nbf: iat,
    sub: subjectFactory(userId),
  };
}
