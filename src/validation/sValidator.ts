import type { Env, Input, MiddlewareHandler, ValidationTargets } from "hono";
import type {
  GenericSchema,
  GenericSchemaAsync,
  InferInput,
  InferOutput,
} from "valibot";

import { sValidator as sValidatorBase } from "@hono/standard-validator";

type HasUndefined<T> = undefined extends T ? true : false;

type SValidatorOptions = {
  dumpErrors?: boolean;
};

export function sValidator<
  T extends
    | GenericSchema<unknown, unknown>
    | GenericSchemaAsync<unknown, unknown>,
  Target extends keyof ValidationTargets,
  E extends Env,
  P extends string,
  In = InferInput<T>,
  Out = InferOutput<T>,
  I extends Input = {
    in: HasUndefined<In> extends true
      ? {
          [K in Target]?:
            | (K extends "json"
                ? In
                : HasUndefined<keyof ValidationTargets[K]> extends true
                  ? { [K2 in keyof In]?: undefined | ValidationTargets[K][K2] }
                  : { [K2_1 in keyof In]: ValidationTargets[K][K2_1] })
            | undefined;
        }
      : {
          [K_1 in Target]: K_1 extends "json"
            ? In
            : HasUndefined<keyof ValidationTargets[K_1]> extends true
              ? {
                  [K2_2 in keyof In]?: undefined | ValidationTargets[K_1][K2_2];
                }
              : { [K2_3 in keyof In]: ValidationTargets[K_1][K2_3] };
        };
    out: Record<Target, Out>;
  },
  V extends I = I,
>(
  target: Target,
  schema: T,
  options?: SValidatorOptions,
): MiddlewareHandler<E, P, V> {
  return sValidatorBase<T, Target, E, P, In, Out, I, V>(
    target,
    schema,
    (result, c) => {
      if (!result.success) {
        if (options?.dumpErrors) {
          console.error(JSON.stringify(result.error, null, 2));
        }

        return c.text("Bad Request", 400);
      }
    },
  );
}
