import { accessTokenPayloadSchema } from "#auth/jwt/schemas";
import * as v from "valibot";

export type AccessTokenPayload = v.InferOutput<typeof accessTokenPayloadSchema>;
