import type { Duration, RefreshToken } from "#auth/jwt/types";

import { durationToSeconds } from "#auth/jwt/timestamps";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
);

type GenerateRefreshTokenProps = {
  expiry: Duration;
  family: number;
  tokenIdLength?: number;
  userId: number;
};

export function generateRefreshToken({
  expiry,
  tokenIdLength = 30,
  ...token
}: GenerateRefreshTokenProps): RefreshToken {
  const creationDate = new Date();
  const expiryDate = new Date(creationDate);
  expiryDate.setTime(expiryDate.getTime() + durationToSeconds(expiry) * 1000);

  const tokenId = nanoid(tokenIdLength);

  return {
    ...token,
    creationDate,
    expiryDate,
    invalidated: false,
    tokenId,
    used: false,
  };
}
