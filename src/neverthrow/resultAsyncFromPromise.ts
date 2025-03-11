import { ResultAsync } from "neverthrow";

import { internalServerErrorFactory } from "./internalServerErrorFactory.js";

export function resultAsyncFromPromise<T>(
  promise: Promise<T>,
): ResultAsync<T, "internal_server_error"> {
  return ResultAsync.fromPromise(promise, internalServerErrorFactory);
}
