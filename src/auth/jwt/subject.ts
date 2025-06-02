import type { SubjectFactory } from "#auth/jwt/types";

import { badRequestErr } from "#neverthrow/error";
import { BadRequest } from "#neverthrow/types";
import { parse } from "#neverthrow/valibot";
import { Result } from "neverthrow";
import * as v from "valibot";

const userIdSchema = v.pipe(v.string(), v.transform(Number), v.integer());

export function extractUserIdFromSubject(
  subjectPrefix: string,
  subject: string,
): Result<number, BadRequest> {
  const subRegexp = new RegExp(`^${subjectPrefix}\\|(\\d+)$`);
  const matches = subRegexp.exec(subject);

  if (matches === null) return badRequestErr("invalid_subject");

  return parse(userIdSchema, matches[1]).orElse(() =>
    badRequestErr("invalid_subject"),
  );
}

export function subjectFactory(subjectPrefix: string): SubjectFactory {
  return (userId) => `${subjectPrefix}|${userId.toString()}`;
}

export function unsafeExtractUserIdFromSubject(
  subject: string,
): number | undefined {
  const subRegexp = new RegExp(`^.*\\|(\\d+)$`);
  const matches = subRegexp.exec(subject);

  return matches === null ? undefined : Number.parseInt(matches[1]);
}
