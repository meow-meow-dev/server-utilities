import type { Duration } from "#auth/jwt/types";

export function days(count: number): Duration {
  return hours(count * 24);
}

export function durationToSeconds({ value }: Duration): number {
  return value;
}

export function hours(count: number): Duration {
  return minutes(count * 60);
}

export function minutes(count: number): Duration {
  return seconds(count * 60);
}

export function seconds(count: number): Duration {
  return buildSecondsDuration(count);
}

export function weeks(count: number): Duration {
  return days(count * 7);
}

function buildSecondsDuration(value: number): Duration {
  return {
    unit: "seconds",
    value,
  };
}
