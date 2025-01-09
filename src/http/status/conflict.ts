import type { Context, Env, Input, TypedResponse } from "hono";

export function conflict<E extends Env, P extends string, I extends Input>(
  c: Context<E, P, I>,
): Response & TypedResponse<"Conflict", 409, "text"> {
  return c.text("Conflict", 409);
}
