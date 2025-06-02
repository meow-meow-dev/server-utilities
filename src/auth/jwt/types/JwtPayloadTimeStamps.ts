import { jwtPayloadTimestampsSchema } from "#auth/jwt/schemas";
import * as v from "valibot";

export type JwtPayloadTimestamps = v.InferOutput<
  typeof jwtPayloadTimestampsSchema
>;

export type WithJwtTimeStamps<P extends Record<string, unknown>> =
  JwtPayloadTimestamps & P;

export type WithoutJwtTimeStamps<P extends JwtPayloadTimestamps> = Omit<
  P,
  keyof JwtPayloadTimestamps
>;
