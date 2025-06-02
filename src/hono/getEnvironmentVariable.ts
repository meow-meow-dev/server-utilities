import type { Context } from "hono";

import { missingEnvironmentVariable } from "#neverthrow/error";
import { env } from "hono/adapter";

export function getEnvironmentVariable(c: Context, key: string): string {
  const value = env(c)[key];

  if (typeof value === "string") return value;

  throw missingEnvironmentVariable(key);
}
