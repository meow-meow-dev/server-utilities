import {
  badRequest,
  conflict,
  forbidden,
  notFound,
  ok,
  unauthorized,
} from "#http/status";
import { sValidator } from "#validation";
import { Hono } from "hono";
import { testClient } from "hono/testing";
import * as v from "valibot";

const app = new Hono()
  .get("/bad-request", (c) => {
    return badRequest(c);
  })
  .get("/conflict", (c) => {
    return conflict(c);
  })
  .get("/forbidden", (c) => {
    return forbidden(c);
  })
  .get("/not-found", (c) => {
    return notFound(c);
  })
  .get("/ok", (c) => {
    return ok(c);
  })
  .get("/unauthorized", (c) => {
    return unauthorized(c);
  })
  .get(
    "/json",
    sValidator(
      "query",
      v.object({
        status: v.pipe(
          v.string(),
          v.transform(Number),
          v.union([
            v.literal(200),
            v.literal(400),
            v.literal(401),
            v.literal(403),
            v.literal(404),
            v.literal(409),
          ]),
        ),
      }),
    ),
    (c) => {
      const { status } = c.req.valid("query");

      return c.json({ status }, status);
    },
  );

export const client = testClient(app);
