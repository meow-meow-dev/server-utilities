import type { Result, ResultAsync } from "neverthrow";

import { InternalServerError } from "#neverthrow/types";
import { err, errAsync } from "neverthrow";

import { concatenateDetails } from "./concatenateDetails.js";

export const internalServerErrorStatus = "internal_server_error" as const;

export function internalServerError(details?: string): InternalServerError {
  return details
    ? { details, type: internalServerErrorStatus }
    : internalServerErrorStatus;
}

const databaseErrorDetails = "database_error";

export function buildDatabaseErrorAsync(): Result<never, InternalServerError> {
  return err({ details: "database_error", type: internalServerErrorStatus });
}

export function databaseError(): InternalServerError {
  return internalServerError(databaseErrorDetails);
}

export function databaseErrorErr(): Result<never, InternalServerError> {
  return err({ details: "database_error", type: internalServerErrorStatus });
}

export function internalServerErrorErr(
  details?: string,
): Result<never, InternalServerError> {
  return err(internalServerError(details));
}

export function internalServerErrorErrAsync(
  details?: string,
): ResultAsync<never, InternalServerError> {
  return errAsync(internalServerError(details));
}

export function missingEnvironmentVariable(
  variableName: string,
): InternalServerError {
  return internalServerError(missingEnvironmentVariableDetails(variableName));
}

export function missingEnvironmentVariableErr(
  variableName: string,
): Result<never, InternalServerError> {
  return err(missingEnvironmentVariable(variableName));
}

export function missingEnvironmentVariableErrAsync(
  variableName: string,
): ResultAsync<never, InternalServerError> {
  return errAsync(missingEnvironmentVariable(variableName));
}

function missingEnvironmentVariableDetails(variableName: string): string {
  return concatenateDetails(["missing_environment_variable", variableName]);
}
