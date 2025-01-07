import type { Context, Env, Input, TypedResponse } from "hono";

export function internalServerError<
  E extends Env,
  P extends string,
  I extends Input,
>(
  c: Context<E, P, I>,
): Response & TypedResponse<"Internal Server Error", 500, "text"> {
  return c.text("Internal Server Error", 500);
}
