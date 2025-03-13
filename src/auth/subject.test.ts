import { describe, it } from "vitest";

import {
  buildSubjectFromUserId,
  extractUserIdFromSubject,
  unsafeExtractUserIdFromSubject,
} from "./subject.js";

const prefix = "my-prefix";

describe("sub", () => {
  it("correctly encodes and decodes a valid user id", ({ expect }) => {
    const userId = 1234;
    const sub = buildSubjectFromUserId(prefix, userId);

    expect(extractUserIdFromSubject(prefix, sub)).toEqual(userId);
    expect(unsafeExtractUserIdFromSubject(sub)).toEqual(userId);
  });

  it("rejects a prefix that doesn't match", ({ expect }) => {
    const userId = 1234;
    expect(
      extractUserIdFromSubject(
        "my-prefix",
        buildSubjectFromUserId("other-prefix", userId),
      ),
    ).toBeUndefined();
  });

  it("rejects an invalid sub", ({ expect }) => {
    expect(
      extractUserIdFromSubject(prefix, "eki-stamps|azerty"),
    ).toBeUndefined();

    expect(unsafeExtractUserIdFromSubject("eki-stamps|azerty")).toBeUndefined();
  });
});
