export function replaceSearchParams(
  url: string,
  params: Record<string, string>,
): string {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();

  return urlObject.toString();
}
