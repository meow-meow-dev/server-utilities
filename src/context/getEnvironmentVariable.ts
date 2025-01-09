import type { Context } from "hono";
import type { ConditionalKeys } from "type-fest";

import { env } from "hono/adapter";

export function getEnvironmentVariable<
  HonoEnv extends {
    Bindings: Record<string, unknown>;
  },
>(
  c: Context<HonoEnv>,
  name: Extract<
    ConditionalKeys<HonoEnv["Bindings"], string | undefined>,
    string
  >,
): string {
  const value = env(c)[name] as string | undefined;
  if (value) return value;

  throw new Error(`Missing environment variable ${name}`);
}
