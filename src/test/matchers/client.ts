import {
  badRequest,
  conflict,
  notFound,
  ok,
  unauthorized,
} from "@meow-meow-dev/server-utilities/~http/status";
import { Hono } from "hono";
import { testClient } from "hono/testing";

const app = new Hono()
  .get("/bad-request", (c) => {
    return badRequest(c);
  })
  .get("/conflict", (c) => {
    return conflict(c);
  })
  .get("/not-found", (c) => {
    return notFound(c);
  })
  .get("/ok", (c) => {
    return ok(c);
  })
  .get("/unauthorized", (c) => {
    return unauthorized(c);
  });

export const client = testClient(app);
