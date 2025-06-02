import type { AccessTokenPayload } from "#auth/jwt/types";
import type {
  BadRequest,
  InternalServerError,
  Unauthorized,
} from "#neverthrow/types";
import type { Context } from "hono";
import type { ResultAsync } from "neverthrow";

import { accessTokenPayloadSchema } from "#auth/jwt/schemas";

import { extractAccessTokenFromHeaders } from "./extractAccessTokenFromHeaders.js";
import { extractJWTPayload } from "./extractJwtPayload.js";

type ExtractAccessTokenPayloadProps = {
  context: Context;
  jwtSecret: string;
};

export function extractAccessTokenPayload({
  context,
  jwtSecret,
}: ExtractAccessTokenPayloadProps): ResultAsync<
  AccessTokenPayload,
  BadRequest | InternalServerError | Unauthorized
> {
  return extractAccessTokenFromHeaders(context).asyncAndThen((token) =>
    extractJWTPayload({
      schema: accessTokenPayloadSchema,
      secretKey: jwtSecret,
      token,
    }),
  );
}
