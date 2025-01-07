import { describe, it } from "vitest";

import { replaceSearchParams } from "./replaceSearchParams.js";

describe("replaceSearchParams", () => {
  it("correcly replaces parameters", ({ expect }) => {
    expect(
      replaceSearchParams("http://example.com?p1=1&p2=azerty", { p: "12345" }),
    ).toEqual("http://example.com/?p=12345");
  });

  it("correcly sets parameters when there's non originally", ({ expect }) => {
    expect(replaceSearchParams("http://example.com", { p: "12345" })).toEqual(
      "http://example.com/?p=12345",
    );
  });
});
