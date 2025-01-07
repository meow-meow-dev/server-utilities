import type { Context, Env, Input, TypedResponse } from "hono";

export function forbidden<E extends Env, P extends string, I extends Input>(
  c: Context<E, P, I>,
): Response & TypedResponse<"Forbidden", 403, "text"> {
  return c.text("Forbidden", 403);
}
