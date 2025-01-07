import { replaceSearchParams } from "@meow-meow-dev/server-utilities/~http/search_params";
import { MiddlewareHandler } from "hono";
import { vi } from "vitest";

type GoogleAuthProps = {
  state?: string;
};

export function googleAuth({ state }: GoogleAuthProps): MiddlewareHandler {
  return async (c, next) => {
    if (c.req.query("google-user")) {
      await next();
    } else {
      const searchParams: Record<string, string> = state ? { state } : {};

      const redirectURL = replaceSearchParams(c.req.url, {
        ...searchParams,
        "google-user": "azertyuiop",
      });

      return c.redirect(redirectURL);
    }
  };
}

vi.mock("@hono/oauth-providers/google", async () =>
  vi.importActual("@hono/oauth-providers/google").then((module) => ({
    ...module,
    googleAuth,
  })),
);
