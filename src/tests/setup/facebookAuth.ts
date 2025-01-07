import { MiddlewareHandler } from "hono";
import { vi } from "vitest";

type FacebookAuthProps = { redirect_uri?: string };

export function facebookAuth({
  redirect_uri,
}: FacebookAuthProps): MiddlewareHandler {
  return async (c, next) => {
    if (c.req.query("facebook-user")) {
      await next();
    } else {
      const redirectURL = new URL(redirect_uri ?? c.req.url);
      redirectURL.searchParams.set("facebook-user", "azertyuiop");

      return c.redirect(redirectURL.href);
    }
  };
}

vi.mock("@hono/oauth-providers/facebook", async () =>
  vi.importActual("@hono/oauth-providers/facebook").then((module) => ({
    ...module,
    facebookAuth,
  })),
);
