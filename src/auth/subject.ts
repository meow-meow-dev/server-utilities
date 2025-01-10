export function buildSubjectFromUserId(
  subjectPrefix: string,
  userId: number,
): string {
  return `${subjectPrefix}|${userId.toString()}`;
}

export function extractUserIdFromSubject(
  subjectPrefix: string,
  subject: string,
): number | undefined {
  const subRegexp = new RegExp(`^${subjectPrefix}\\|(\\d+)$`);
  const matches = subRegexp.exec(subject);

  return matches === null ? undefined : Number.parseInt(matches[1]);
}
