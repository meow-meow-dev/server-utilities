import type { Context, Env, Input, TypedResponse } from "hono";

export function notFound<E extends Env, P extends string, I extends Input>(
  c: Context<E, P, I>,
): Response & TypedResponse<"Not Found", 404, "text"> {
  return c.text("Not Found", 404);
}
