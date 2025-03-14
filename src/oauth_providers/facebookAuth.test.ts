import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { facebookAuth } from "./facebookAuth.js";

describe("facebookAuth", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get(
      "/auth/facebook",
      facebookAuth({
        fields: [],
        scope: [],
      }),
      (c) => {
        return c.text(c.var["redirect-to"] ?? "OK", 200);
      },
    );

    const res = await testClient(app).auth.facebook.$get({
      query: { redirect_to: "/my-account" },
    });

    expect(res.status).toEqual(302);

    const location = res.headers.get("location");

    if (location) {
      const url = new URL(location);

      const res = await testClient(app).auth.facebook.$get({
        query: Object.fromEntries([...url.searchParams.entries()]),
      });

      expect(res.status).toEqual(200);
      expect(await res.text()).toEqual("/my-account");
    } else {
      expect.fail();
    }
  });
});
