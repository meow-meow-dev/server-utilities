import type { BadRequest, Unauthorized } from "#neverthrow/types";
import type { BaseIssue, BaseSchema, InferOutput } from "valibot";

import {
  concatenateDetails,
  parseErrorErr,
  unauthorized,
} from "#neverthrow/error";
import { parse } from "#neverthrow/valibot";
import { verify } from "hono/jwt";
import { JwtTokenExpired } from "hono/utils/jwt/types";
import { ResultAsync } from "neverthrow";

type ExtractJwtPayloadProps<
  SchemaInput,
  SchemaOutput,
  SchemaIssue extends BaseIssue<unknown>,
  Schema extends BaseSchema<SchemaInput, SchemaOutput, SchemaIssue>,
> = {
  payloadType?: string;
  schema: Schema;
  secretKey: string;
  token: string;
};

export function extractJWTPayload<
  SchemaInput,
  SchemaOutput,
  SchemaIssue extends BaseIssue<unknown>,
  Schema extends BaseSchema<SchemaInput, SchemaOutput, SchemaIssue>,
>({
  payloadType,
  schema,
  secretKey,
  token,
}: ExtractJwtPayloadProps<
  SchemaInput,
  SchemaOutput,
  SchemaIssue,
  Schema
>): ResultAsync<InferOutput<Schema>, BadRequest | Unauthorized> {
  return ResultAsync.fromPromise(verify(token, secretKey), (error) =>
    unauthorized(
      concatenateDetails([
        "invalid_token",
        payloadType,
        error instanceof JwtTokenExpired ? "expired_access_token" : undefined,
      ]),
    ),
  ).andThen((payload) => {
    return parse(schema, payload).orElse(() => {
      console.error({ payload });
      return parseErrorErr(
        concatenateDetails(["invalid_payload", payloadType]),
      );
    });
  });
}
