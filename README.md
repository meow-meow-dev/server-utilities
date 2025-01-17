## Vitest matchers

A collection of matchers to easily test `Response` using [Vitest](https://https://vitest.dev/).

| Matcher                | Expected status | Expected text |
| ---------------------- | --------------- | ------------- |
| `toBeHTTPOk`           | 200             | Ok            |
| `toBeHTTPBadRequest`   | 400             | Bad Request   |
| `toBeHTTPUnauthorized` | 401             | Unauthorized  |
| `toBeHTTPForbidden`    | 403             | Forbidden     |
| `toBeHTTPNotFound`     | 404             | Ok            |
| `toBeHTTPConflict`     | 409             | Conflict      |

When not given any argument, they expect the standard text response ("OK" for status 200, "Bad Request" for 404...).
They can also expect a specific text (`toBeHTTPOk("Update successful")`) or json value (`toBeHTTPOk({ json: { id: 2, name: "New item" } })`)

## Validation

`@meow-meow-dev/server-utilities/validation` contains [Valibot](https://valibot.dev) utilities.

### vValibot

Drop-in replacement from `@hono/valibot-validator`'s `vValidator`.
Returns a text response "Bad Request" instead of a JSON containing the errors.

### Schemas

| Schema                 | Validates                                    |
| ---------------------- | -------------------------------------------- |
| `queryIntegerIdSchema` | integer identifiers inside query parameters. |
| `nonEmptyStringSchema` | non-empty strings                            |
| `integerSchema`        | integer numbers                              |

### Sample code

```typescript
import {
  integerSchema,
  nonEmptyStringSchema,
  queryIntegerIdSchema,
  vValidator,
} from "@meow-meow-dev/server-utilities/validation";
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
```
