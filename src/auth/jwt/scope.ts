import type { AccessTokenPayload } from "./types/AccessTokenPayload.js";

const scopesSeparator = " ";

export function buildScope(scopes: readonly string[]): string {
  return scopes.join(scopesSeparator);
}

export function extractScopes({ scope }: AccessTokenPayload): string[] {
  return scope.split(scopesSeparator);
}
