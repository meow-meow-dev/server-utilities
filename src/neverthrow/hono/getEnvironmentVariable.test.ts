import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { getEnvironmentVariable } from "./getEnvironmentVariable.js";

describe("getEnvironmentVariable", () => {
  it("detects missing environment variables", async ({ expect }) => {
    import.meta.env.JWT_SECRET = "secret";

    const app = new Hono<{
      Bindings: {
        ASSETS: () => Promise<unknown>;
        FORGOTTEN_VARIABLE: string | undefined;
        JWT_SECRET: string | undefined;
      };
    }>().get("/", (c) => {
      expect(getEnvironmentVariable(c, "JWT_SECRET")._unsafeUnwrap()).toEqual(
        "secret",
      );
      expect(() =>
        getEnvironmentVariable(c, "FORGOTTEN_VARIABLE")._unsafeUnwrap(),
      ).toThrow();

      return c.text("OK", 200);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(200);
    expect(await res.text()).toEqual("OK");
  });
});
