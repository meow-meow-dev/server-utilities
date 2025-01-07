import { Hono } from "hono";
import { testClient } from "hono/testing";
import * as v from "valibot";
import { describe, it } from "vitest";

import { vValidator } from "./vValidator.js";

const schema = v.pipe(v.string(), v.nonEmpty());

describe("vValidator", () => {
  it("test", async ({ expect }) => {
    const app = new Hono().get("/search", vValidator("json", schema), (c) =>
      c.text(c.req.valid("json"), 200),
    );
    const res = await testClient(app).search.$get({ json: "" });

    expect(res.status).toEqual(400);
    expect(await res.text()).toEqual("Bad Request");
  });
});
