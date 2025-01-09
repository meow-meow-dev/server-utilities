import type { Context } from "hono";

import { env } from "hono/adapter";

export function getEnvironmentVariable<
  Key extends string,
  Keys extends Key | string,
>(
  c: Context<{ Bindings: Record<Keys, string | undefined> }>,
  name: Key,
): string {
  const value = env(c)[name];
  if (value) return value;

  throw new Error(`Missing environment variable ${name}`);
}
