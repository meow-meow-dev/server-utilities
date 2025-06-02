import type { HandlerAuthenticationProps } from "#types";
import type { Context, Env } from "hono";

export function authProps<
  E extends Env & {
    Variables: {
      authentication: { userId: number };
    };
  },
>(c: Context<E>): HandlerAuthenticationProps {
  const { authentication } = c.var;

  return { authentication };
}
