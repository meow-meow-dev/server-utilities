import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { unauthorized } from "./unauthorized.js";

describe("unauthorized", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return unauthorized(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(401);
    expect(await res.text()).toEqual("Unauthorized");
  });
});
