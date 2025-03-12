import type { Context, TypedResponse } from "hono";

import { httpErrorFromHTTPErrorType, HTTPErrorType } from "#http/status";
import { ResultAsync } from "neverthrow";

export function customResponse<T, Output>(
  c: Context,
  result: ResultAsync<T, HTTPErrorType>,
  factory: (value: T) => Output,
): Promise<
  | Output
  | (Response & TypedResponse<string, 400 | 401 | 403 | 404 | 500, "text">)
> {
  return result.match((value) => factory(value), httpErrorFromHTTPErrorType(c));
}
