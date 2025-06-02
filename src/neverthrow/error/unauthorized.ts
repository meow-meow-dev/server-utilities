import type { Unauthorized } from "#neverthrow/types";
import type { Result, ResultAsync } from "neverthrow";

import { err, errAsync } from "neverthrow";

export const unauthorizedStatus = "unauthorized" as const;

export function unauthorized(details?: string): Unauthorized {
  return details ? { details, type: unauthorizedStatus } : unauthorizedStatus;
}

export function unauthorizedErr(details?: string): Result<never, Unauthorized> {
  return err(unauthorized(details));
}

export function unauthorizedErrAsync(
  details?: string,
): ResultAsync<never, Unauthorized> {
  return errAsync(unauthorized(details));
}
