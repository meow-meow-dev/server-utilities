import type { Context, Env, Input, TypedResponse } from "hono";

export function ok<E extends Env, P extends string, I extends Input>(
  c: Context<E, P, I>,
): Response & TypedResponse<"OK", 200, "text"> {
  return c.text("OK", 200);
}
