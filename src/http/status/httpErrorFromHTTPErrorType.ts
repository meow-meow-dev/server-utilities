import type { Context, TypedResponse } from "hono";

import type { HTTPErrorType } from "./HTTPErrorType.js";

import { badRequest } from "./badRequest.js";
import { forbidden } from "./forbidden.js";
import { internalServerError } from "./internalServerError.js";
import { notFound } from "./notFound.js";
import { unauthorized } from "./unauthorized.js";

export function httpErrorFromHTTPErrorType(
  c: Context,
): (
  errorType: HTTPErrorType,
) => Response & TypedResponse<string, 400 | 401 | 403 | 404 | 500, "text"> {
  return (errorType) => {
    switch (errorType) {
      case "bad_request":
        return badRequest(c);
      case "forbidden":
        return forbidden(c);
      case "internal_server_error":
        return internalServerError(c);
      case "not_found":
        return notFound(c);
      case "unauthorized":
        return unauthorized(c);
    }
  };
}
