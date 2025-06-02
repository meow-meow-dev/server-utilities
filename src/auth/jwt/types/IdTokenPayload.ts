import { idTokenPayloadSchema } from "#auth/jwt/schemas";
import * as v from "valibot";

export type IdTokenPayload = v.InferOutput<typeof idTokenPayloadSchema>;
