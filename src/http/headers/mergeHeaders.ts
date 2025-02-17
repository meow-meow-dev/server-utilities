export function mergeHeaders(
  currentHeader: HeadersInit,
  addedFields: Record<string, string>,
): HeadersInit {
  if (Array.isArray(currentHeader)) {
    return [...currentHeader, ...Object.entries(addedFields)];
  } else {
    const newHeader = new Headers(currentHeader);
    for (const [key, value] of Object.entries(addedFields))
      newHeader.set(key, value);
    return newHeader;
  }
}
