import { extendWithHTTPMatchers } from "@meow-meow-dev/server-utilities/~test/matchers";
import { expect } from "vitest";

extendWithHTTPMatchers(expect);
