import { nonEmptyStringSchema } from "#validation";
import * as v from "valibot";

export const identitySchema = v.strictObject({
  firstName: nonEmptyStringSchema,
  lastName: nonEmptyStringSchema,
});
