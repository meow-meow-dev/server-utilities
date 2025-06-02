import { DetailedError } from "./DetailedError.js";

export type BadRequest = HttpErrorT<"bad_request">;

export type Forbidden = HttpErrorT<"forbidden">;

export type HttpError =
  | BadRequest
  | Forbidden
  | InternalServerError
  | NotFound
  | Unauthorized;

export type InternalServerError = HttpErrorT<"internal_server_error">;

export type NotFound = HttpErrorT<"not_found">;

export type Unauthorized = HttpErrorT<"unauthorized">;

type HttpErrorT<Status extends string> = DetailedError<Status> | Status;
