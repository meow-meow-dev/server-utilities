import type { HttpError } from "#neverthrow/types";
import type { Context, TypedResponse } from "hono";

import { isDetailedError } from "./isDetailedError.js";

const errorTypeToHttpStatusCode = {
  bad_request: 400,
  forbidden: 403,
  internal_server_error: 500,
  not_found: 404,
  unauthorized: 401,
} as const;

const httpStatusCodeToDefaultStatus = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export function toHttpError(
  c: Context,
): (
  error: HttpError,
) => Response & TypedResponse<string, 400 | 401 | 403 | 404 | 500, "text"> {
  return (error) => {
    if (isDetailedError(error)) {
      const errorType = error.type;
      const statusCode = errorTypeToHttpStatusCode[errorType];
      const details =
        typeof error == "string"
          ? httpStatusCodeToDefaultStatus[statusCode]
          : `${error.type}.${error.details}`;

      return c.text(details, statusCode);
    } else {
      const statusCode = errorTypeToHttpStatusCode[error];

      return c.text(httpStatusCodeToDefaultStatus[statusCode], statusCode);
    }
  };
}
