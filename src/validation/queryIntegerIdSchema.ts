import * as v from "valibot";

export const queryIntegerIdSchema = v.pipe(
  v.string(),
  v.transform(Number),
  v.integer(),
);

/**
 * @deprecated use queryIntegerIdSchema instead
 */

export const numericalIdSchema = queryIntegerIdSchema;
