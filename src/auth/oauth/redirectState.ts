import type { Context, Env, Input } from "hono";

import * as v from "valibot";

const stateSchema = v.strictObject({
  redirectTo: v.string(),
});

type State = v.InferOutput<typeof stateSchema>;

export function buildRedirectState<
  E extends Env,
  P extends string,
  I extends Input,
>(c: Context<E, P, I>): string | undefined {
  const redirectTo = c.req.query("redirect_to");

  if (redirectTo) {
    const state: State = { redirectTo };
    return JSON.stringify(state);
  } else {
    return undefined;
  }
}

export function retrieveRedirectFromState<
  E extends Env & { Variables: { "redirect-to": string | undefined } },
  P extends string,
  I extends Input,
>(c: Context<E, P, I>): void {
  const state = c.req.query("state");
  if (state) {
    try {
      const redirectTo = v.parse(stateSchema, JSON.parse(state)).redirectTo;

      c.set("redirect-to", redirectTo);
    } catch {
      /* Do nothing */
    }
  }
}
