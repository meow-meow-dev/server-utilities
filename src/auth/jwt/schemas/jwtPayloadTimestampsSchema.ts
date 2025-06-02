import { integerSchema } from "#validation";
import * as v from "valibot";

export const jwtPayloadTimestampsSchema = v.strictObject({
  exp: integerSchema,
  iat: integerSchema,
  nbf: integerSchema,
});
