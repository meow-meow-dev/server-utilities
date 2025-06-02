import { DateTime } from "luxon";
import * as v from "valibot";

export const luxonDateTimeSchema = v.pipe(
  v.string(),
  v.isoTimestamp(),
  v.transform((date) => DateTime.fromISO(date, { zone: "UTC" })),
  v.check((date): date is DateTime<true> => date.isValid),
  v.transform((date): DateTime<true> => date as DateTime<true>),
);
