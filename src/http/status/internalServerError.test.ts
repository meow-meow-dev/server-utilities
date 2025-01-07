import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { internalServerError } from "./internalServerError.js";

describe("internalServerError", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return internalServerError(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(500);
    expect(await res.text()).toEqual("Internal Server Error");
  });
});
