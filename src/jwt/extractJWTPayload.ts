import type { BaseIssue, BaseSchema, InferOutput } from "valibot";

import { verify } from "hono/jwt";
import { parse } from "valibot";

type ExtractJWTPayloadProps<
  SchemaInput,
  SchemaOutput,
  SchemaIssue extends BaseIssue<unknown>,
  Schema extends BaseSchema<SchemaInput, SchemaOutput, SchemaIssue>,
> = {
  cookie: string | undefined;
  schema: Schema;
  secretKey: string;
};

export async function extractJWTPayload<
  SchemaInput,
  SchemaOutput,
  SchemaIssue extends BaseIssue<unknown>,
  Schema extends BaseSchema<SchemaInput, SchemaOutput, SchemaIssue>,
>({
  cookie,
  schema,
  secretKey,
}: ExtractJWTPayloadProps<
  SchemaInput,
  SchemaOutput,
  SchemaIssue,
  Schema
>): Promise<InferOutput<Schema> | undefined> {
  if (cookie) {
    try {
      const payload = await verify(cookie, secretKey);

      return parse(schema, payload);
    } catch {
      // Ignore error
    }
  }
}
