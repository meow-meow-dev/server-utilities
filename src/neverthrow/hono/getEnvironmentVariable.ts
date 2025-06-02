import type { InternalServerError } from "#neverthrow/types";
import type { Context } from "hono";
import type { Result } from "neverthrow";

import { missingEnvironmentVariableErr } from "#neverthrow/error";
import { env } from "hono/adapter";
import { ok } from "neverthrow";

export function getEnvironmentVariable(
  c: Context,
  key: string,
): Result<string, InternalServerError> {
  const value = env(c)[key];

  return typeof value === "string"
    ? ok(value)
    : missingEnvironmentVariableErr(key);
}
