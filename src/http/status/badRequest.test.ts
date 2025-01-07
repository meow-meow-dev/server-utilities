import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, it } from "vitest";

import { badRequest } from "./badRequest.js";

describe("badRequest", () => {
  it("returns the standard status and text", async ({ expect }) => {
    const app = new Hono().get("/", (c) => {
      return badRequest(c);
    });

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(400);
    expect(await res.text()).toEqual("Bad Request");
  });
});
