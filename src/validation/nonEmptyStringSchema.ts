import * as v from "valibot";

export const nonEmptyStringSchema = v.pipe(v.string(), v.nonEmpty());
