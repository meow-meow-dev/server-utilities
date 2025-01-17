import * as v from "valibot";
import { describe, it } from "vitest";

import { queryIntegerIdSchema } from "./queryIntegerIdSchema.js";

describe("queryNumericalIdSchema", () => {
  it("validates an integer id", ({ expect }) => {
    expect(() => v.parse(queryIntegerIdSchema, "123")).not.toThrow();
  });

  it("doesn't validate a non-numerical id", ({ expect }) => {
    expect(() => v.parse(queryIntegerIdSchema, "azerty")).toThrow();
  });

  it("doesn't validate a floating-point id", ({ expect }) => {
    expect(() => v.parse(queryIntegerIdSchema, "123.4")).toThrow();
  });
});
