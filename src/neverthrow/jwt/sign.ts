import type { InternalServerError } from "#neverthrow/types";
import type { JWTPayload } from "hono/utils/jwt/types";
import type { ResultAsync } from "neverthrow";

import { signFactory } from "./signFactory.js";

type SignProps = { payload: JWTPayload; secret: string };

export function sign({
  payload,
  secret,
}: SignProps): ResultAsync<string, InternalServerError> {
  return signFactory(secret)(payload);
}
