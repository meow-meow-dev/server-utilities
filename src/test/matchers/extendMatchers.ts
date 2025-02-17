import type { ExpectStatic } from "vitest";

import { extendWithHTTPMatchers } from "./http/index.js";
// import { extendWithNeverthrowMatchers } from "./neverthrow/index.js";

export function extendMatchers(expect: ExpectStatic): void {
  extendWithHTTPMatchers(expect);
  //  extendWithNeverthrowMatchers(expect);
}
