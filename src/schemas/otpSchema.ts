import * as v from "valibot";

export const otpSchema = v.pipe(v.string(), v.regex(/^\d{6}$/));
