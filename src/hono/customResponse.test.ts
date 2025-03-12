import type { HTTPErrorType } from "#http/status";

import { Hono } from "hono";
import { testClient } from "hono/testing";
import { errAsync, okAsync } from "neverthrow";
import { describe, it } from "vitest";

import { customResponse } from "./customResponse.js";

describe("customResponse", () => {
  it("returns the standard status and text on success", async ({ expect }) => {
    const app = new Hono().get("/", (c) =>
      customResponse(c, okAsync<number, HTTPErrorType>(1), (value) =>
        c.json(
          {
            value,
          },
          200,
        ),
      ),
    );

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual({ value: 1 });
  });

  it("returns the standard status and text on failure", async ({ expect }) => {
    const app = new Hono().get("/", (c) =>
      customResponse(
        c,
        errAsync<undefined, HTTPErrorType>("not_found"),
        (value) =>
          c.json(
            {
              value,
            },
            200,
          ),
      ),
    );

    const res = await testClient(app).index.$get();

    expect(res.status).toEqual(404);
    expect(await res.text()).toEqual("Not Found");
  });
});
