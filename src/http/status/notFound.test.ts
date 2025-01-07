import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { notFound } from "./notFound.js";

describe("notFound", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return notFound(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(404);
    expect(await res.text()).toEqual("Not Found");
  });
});
