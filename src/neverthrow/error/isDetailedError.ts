import type { DetailedError } from "#neverthrow/types";

export function isDetailedError(
  error: unknown,
): error is DetailedError<string> {
  return (
    error !== null &&
    typeof error === "object" &&
    "type" in error &&
    typeof error.type === "string" &&
    "details" in error &&
    typeof error.details === "string"
  );
}
