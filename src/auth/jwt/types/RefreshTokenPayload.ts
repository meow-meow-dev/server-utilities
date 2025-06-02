import { refreshTokenPayloadSchema } from "#auth/jwt/schemas";
import * as v from "valibot";

export type RefreshTokenPayload = v.InferOutput<
  typeof refreshTokenPayloadSchema
>;
