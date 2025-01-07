import * as v from "valibot";
import { describe, it } from "vitest";

import { numericalIdSchema } from "./numericalIdSchema.js";

describe("numericalIdSchema", () => {
  it("validates an integer id", ({ expect }) => {
    expect(() => v.parse(numericalIdSchema, "123")).not.toThrow();
  });

  it("doesn't validate a non-numerical id", ({ expect }) => {
    expect(() => v.parse(numericalIdSchema, "azerty")).toThrow();
  });

  it("doesn't validate a floating-point id", ({ expect }) => {
    expect(() => v.parse(numericalIdSchema, "123.4")).toThrow();
  });
});
