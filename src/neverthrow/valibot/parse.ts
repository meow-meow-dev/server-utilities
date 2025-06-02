import type { BaseIssue, BaseSchema } from "valibot";

import { Result } from "neverthrow";
import * as v from "valibot";

export function parse<
  const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  schema: TSchema,
  value: unknown,
): Result<v.InferOutput<TSchema>, "parse_error"> {
  return Result.fromThrowable(
    () => v.parse(schema, value),
    () => "parse_error" as const,
  )();
}
