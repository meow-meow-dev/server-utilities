import type { Context } from "hono";
import type { Result } from "neverthrow";

import { err, ok } from "neverthrow";

export function extractAccessTokenFromHeaders(
  c: Context,
): Result<string, "unauthorized"> {
  const header = c.req.header("Authorization");
  if (!header) return err("unauthorized" as const);

  const token = header.startsWith("Bearer ")
    ? header.substring("Bearer ".length)
    : undefined;
  if (token === undefined) return err("unauthorized" as const);

  return ok(token);
}
