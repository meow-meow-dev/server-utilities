import { internalServerErrorFactory } from "#neverthrow";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

export function resultAsyncFromCreatePromise(
  promise: Promise<number | undefined>,
): ResultAsync<number, "internal_server_error"> {
  return resultAsyncFromPromise(promise).andThen((id) =>
    id === undefined ? errAsync("internal_server_error" as const) : okAsync(id),
  );
}

export function resultAsyncFromPromise<T>(
  promise: Promise<T>,
): ResultAsync<T, "internal_server_error"> {
  return ResultAsync.fromPromise(promise, internalServerErrorFactory);
}

export function resultAsyncFromUpdatePromise(
  promise: Promise<number | undefined>,
): ResultAsync<undefined, "internal_server_error" | "not_found"> {
  return resultAsyncFromPromise(promise).andThen((id) =>
    id === undefined ? errAsync("not_found" as const) : okAsync(undefined),
  );
}

export const resultAsyncFromDeletePromise = resultAsyncFromUpdatePromise;
