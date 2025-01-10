import type { Context } from "hono";

import { env } from "hono/adapter";

export function getEnvironmentVariable(c: Context, name: string): string {
  const value = env(c)[name];
  if (value) return value;

  throw new Error(`Missing environment variable ${name}`);
}
