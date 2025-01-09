import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { conflict } from "./conflict.js";

describe("conflict", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return conflict(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(409);
    expect(await res.text()).toEqual("Conflict");
  });
});
