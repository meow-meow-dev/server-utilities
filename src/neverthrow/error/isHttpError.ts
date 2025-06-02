import { HttpError } from "#neverthrow/types";

import { badRequestStatus } from "./badRequest.js";
import { forbiddenStatus } from "./forbidden.js";
import { internalServerErrorStatus } from "./internalServerError.js";
import { isDetailedError } from "./isDetailedError.js";
import { unauthorizedStatus } from "./unauthorized.js";

const allStatuses: readonly string[] = [
  badRequestStatus,
  forbiddenStatus,
  internalServerErrorStatus,
  unauthorizedStatus,
];
// TODO not_found

export function isHttpError(error: unknown): error is HttpError {
  const potentialStatus = isDetailedError(error)
    ? error.type
    : typeof error === "string"
      ? error
      : undefined;
  return potentialStatus ? allStatuses.includes(potentialStatus) : false;
}
