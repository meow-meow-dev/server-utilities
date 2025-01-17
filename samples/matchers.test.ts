import {
  integerSchema,
  nonEmptyStringSchema,
  queryIntegerIdSchema,
  vValidator,
} from "@meow-meow-dev/server-utilities/~validation";
import { Hono } from "hono";
import { testClient } from "hono/testing";
import * as v from "valibot";
import { describe, it } from "vitest";

const route = new Hono().post(
  "/api",
  vValidator("query", v.strictObject({ id: queryIntegerIdSchema })),
  vValidator(
    "json",
    v.strictObject({ name: nonEmptyStringSchema, yearOfBirth: integerSchema }),
  ),
  (c) => {
    const { id } = c.req.valid("query");
    const { name, yearOfBirth } = c.req.valid("json");

    const age = new Date().getFullYear() - yearOfBirth;

    return c.text(
      `Hello ${name}, your id is #${id.toString()} and you're ${age.toString()} years old`,
      200,
    );
  },
);

const client = testClient(route);

describe("Matchers sample", () => {
  it("checks that name isn't empty", async ({ expect }) => {
    await expect(
      client.api.$post({
        json: { name: "", yearOfBirth: 1984 },
        query: { id: "23" },
      }),
    ).toBeHTTPBadRequest();

    await expect(
      client.api.$post({
        json: { name: "John Doe", yearOfBirth: 1984 },
        query: { id: "23" },
      }),
    ).toBeHTTPOk("Hello John Doe, your id is #23 and you're 41 years old");
  });
});
