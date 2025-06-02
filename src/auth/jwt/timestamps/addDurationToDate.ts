import type { Duration } from "#auth/jwt/types";

import { durationToSeconds } from "./duration.js";

export function addDurationToDate(date: Date, duration: Duration): Date {
  return new Date(date.getTime() + durationToSeconds(duration) * 1000);
}
