import type { Context, TypedResponse } from "hono";

import { httpErrorFromHTTPErrorType, HTTPErrorType, ok } from "#http/status";
import { ResultAsync } from "neverthrow";

export function defaultResponse<T>(
  c: Context,
  result: ResultAsync<T, HTTPErrorType>,
): Promise<
  Response & TypedResponse<string, 200 | 400 | 401 | 403 | 404 | 500, "text">
> {
  return result.match(
    (): Response & TypedResponse<string, 200, "text"> => ok(c),
    httpErrorFromHTTPErrorType(c),
  );
}
