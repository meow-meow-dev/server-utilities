import * as v from "valibot";

export const numericalIdSchema = v.pipe(
  v.string(),
  v.transform(Number),
  v.integer(),
);
