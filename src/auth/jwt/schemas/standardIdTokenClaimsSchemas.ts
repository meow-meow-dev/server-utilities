import { nonEmptyStringSchema } from "#validation";
import * as v from "valibot";

export const standardIdTokenClaimsSchemas = {
  email: v.pipe(v.string(), v.email()),
  family_name: nonEmptyStringSchema,
  given_name: nonEmptyStringSchema,
  sub: nonEmptyStringSchema,
};
