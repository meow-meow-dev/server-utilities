import type { Context, Env, Input, TypedResponse } from "hono";

export function badRequest<E extends Env, P extends string, I extends Input>(
  c: Context<E, P, I>,
): Response & TypedResponse<"Bad Request", 400, "text"> {
  return c.text("Bad Request", 400);
}
