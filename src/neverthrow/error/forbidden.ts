import type { Forbidden } from "#neverthrow/types";
import type { Result, ResultAsync } from "neverthrow";

import { err, errAsync } from "neverthrow";

export const forbiddenStatus = "forbidden" as const;

export function forbidden(details?: string): Forbidden {
  return details ? { details, type: forbiddenStatus } : forbiddenStatus;
}

export function forbiddenErr(details?: string): Result<never, Forbidden> {
  return err(forbidden(details));
}

export function forbiddenErrAsync(
  details?: string,
): ResultAsync<never, Forbidden> {
  return errAsync(forbidden(details));
}
