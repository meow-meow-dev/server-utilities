import type { InternalServerError } from "#neverthrow/types";
import type { JWTPayload } from "hono/utils/jwt/types";

import { internalServerErrorFactory } from "#neverthrow";
import { sign as signBase } from "hono/jwt";
import { ResultAsync } from "neverthrow";

export function signFactory(
  secret: string,
): (payload: JWTPayload) => ResultAsync<string, InternalServerError> {
  return ResultAsync.fromThrowable(
    (payload) => signBase(payload, secret),
    internalServerErrorFactory,
  );
}
