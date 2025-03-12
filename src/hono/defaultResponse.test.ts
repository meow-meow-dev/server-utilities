import type { HTTPErrorType } from "#http/status";

import { Hono } from "hono";
import { testClient } from "hono/testing";
import { errAsync, okAsync } from "neverthrow";
import { describe, it } from "vitest";

import { defaultResponse } from "./defaultResponse.js";

describe("defaultResponse", () => {
  it("returns the standard status and text on success", async ({ expect }) => {
    const app = new Hono().get("/", (c) =>
      defaultResponse(c, okAsync<undefined, HTTPErrorType>(undefined)),
    );

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(200);
    expect(await res.text()).toEqual("OK");
  });

  it("returns the standard status and text on failure", async ({ expect }) => {
    const app = new Hono().get("/", (c) =>
      defaultResponse(c, errAsync<undefined, HTTPErrorType>("not_found")),
    );

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(404);
    expect(await res.text()).toEqual("Not Found");
  });
});
