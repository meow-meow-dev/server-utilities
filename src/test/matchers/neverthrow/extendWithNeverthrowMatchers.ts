import type { ExpectationResult } from "@meow-meow-dev/server-utilities/~test/matchers/types";
import type { ExpectStatic } from "vitest";

import { toBeNeverthrowErr } from "./toBeNeverthrowErr.js";
import { toBeNeverthrowOk } from "./toBeNeverthrowOk.js";

export function extendWithNeverthrowMatchers(expect: ExpectStatic): void {
  expect.extend({
    toBeNeverthrowErr(received, expected): Promise<ExpectationResult> {
      return toBeNeverthrowErr(this.equals, received, expected);
    },
    toBeNeverthrowOk(received, expected): Promise<ExpectationResult> {
      return toBeNeverthrowOk(this.equals, received, expected);
    },
  });
}
