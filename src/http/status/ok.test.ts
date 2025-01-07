import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { ok } from "./ok.js";

describe("ok", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return ok(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(200);
    expect(await res.text()).toEqual("OK");
  });
});
