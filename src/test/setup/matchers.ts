import { extendWithHTTPMatchers } from "#test/matchers/http";
import { extendWithNeverthrowMatchers } from "#test/matchers/neverthrow";
import { expect } from "vitest";

extendWithHTTPMatchers(expect);
extendWithNeverthrowMatchers(expect);
