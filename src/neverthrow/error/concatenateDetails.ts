export function concatenateDetails([detail, ...details]: [
  string,
  ...(string | undefined)[],
]): string {
  let output = detail;
  details.forEach((currentDetail) => {
    if (currentDetail) output = `${output}.${currentDetail}`;
  });

  return output;
}
