import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { forbidden } from "./forbidden.js";

describe("forbidden", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return forbidden(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(403);
    expect(await res.text()).toEqual("Forbidden");
  });
});
