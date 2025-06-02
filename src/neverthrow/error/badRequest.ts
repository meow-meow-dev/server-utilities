import type { BadRequest } from "#neverthrow/types";
import type { Result, ResultAsync } from "neverthrow";

import { err, errAsync } from "neverthrow";

import { concatenateDetails } from "./concatenateDetails.js";

export const badRequestStatus = "bad_request" as const;

export function badRequest(details?: string): BadRequest {
  return details ? { details, type: badRequestStatus } : badRequestStatus;
}

export function badRequestErr(details?: string): Result<never, BadRequest> {
  return err(badRequest(details));
}

export function badRequestErrAsync(
  details?: string,
): ResultAsync<never, BadRequest> {
  return errAsync(badRequest(details));
}

const parseErrorDetails = "parse_error";

export function parseError(details?: string): BadRequest {
  return badRequest(concatenateDetails([parseErrorDetails, details]));
}

export function parseErrorErr(details?: string): Result<never, BadRequest> {
  return err(parseError(details));
}

export function parseErrorErrAsync(
  details?: string,
): ResultAsync<never, BadRequest> {
  return errAsync(parseError(details));
}
