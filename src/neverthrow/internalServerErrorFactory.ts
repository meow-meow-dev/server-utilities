export function internalServerErrorFactory(
  error: unknown,
): "internal_server_error" {
  console.error(error);
  return "internal_server_error";
}
