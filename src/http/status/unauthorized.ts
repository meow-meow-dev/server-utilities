import type { Context, Env, Input, TypedResponse } from "hono";

export function unauthorized<E extends Env, P extends string, I extends Input>(
  c: Context<E, P, I>,
): Response & TypedResponse<"Unauthorized", 401, "text"> {
  return c.text("Unauthorized", 401);
}
