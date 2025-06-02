import { describe, it } from "vitest";

import {
  extractUserIdFromSubject,
  subjectFactory,
  unsafeExtractUserIdFromSubject,
} from "./subject.js";

const prefix = "my-prefix";

describe("sub", () => {
  it("correctly encodes and decodes a valid user id", ({ expect }) => {
    const userId = 1234;
    const sub = subjectFactory(prefix)(userId);

    expect(extractUserIdFromSubject(prefix, sub)._unsafeUnwrap()).toEqual(
      userId,
    );
    expect(unsafeExtractUserIdFromSubject(sub)).toEqual(userId);
  });

  it("rejects a prefix that doesn't match", ({ expect }) => {
    const userId = 1234;
    expect(
      extractUserIdFromSubject(
        "my-prefix",
        subjectFactory("other-prefix")(userId),
      )._unsafeUnwrapErr(),
    ).toEqual({ details: "invalid_subject", type: "bad_request" });
  });

  it("rejects an invalid sub", ({ expect }) => {
    expect(
      extractUserIdFromSubject(prefix, "eki-stamps|azerty")._unsafeUnwrapErr(),
    ).toEqual({ details: "invalid_subject", type: "bad_request" });

    expect(unsafeExtractUserIdFromSubject("eki-stamps|azerty")).toEqual(
      undefined,
    );
  });
});
