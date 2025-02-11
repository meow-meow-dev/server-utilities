import type { HeadersInit } from "@cloudflare/workers-types";

export function mergeHeaders(
  currentHeader: HeadersInit,
  addedFields: Record<string, string>,
): HeadersInit {
  if (currentHeader instanceof Headers) {
    for (const [keyboard, value] of Object.entries(addedFields))
      currentHeader.set(keyboard, value);

    return currentHeader;
  } else if (Array.isArray(currentHeader)) {
    return [...currentHeader, ...Object.entries(addedFields)];
  } else {
    return { ...currentHeader, ...addedFields };
  }
}
