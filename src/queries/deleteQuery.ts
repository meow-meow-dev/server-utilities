import { resultAsyncFromPromise } from "#neverthrow";
import { errAsync, okAsync } from "neverthrow";

import type { BuildKyselyProps } from "./buildKysely.js";
import type { PromiseFactory, Query } from "./QueryProps.js";

import { d1ToKysely } from "./d1ToKysely.js";

export function deleteQuery<DB, FIELDS extends Record<string, unknown>>(
  promiseFactory: PromiseFactory<DB, FIELDS, number | undefined>,
  kyselyOptions?: BuildKyselyProps,
): Query<FIELDS, void, "internal_server_error" | "not_found"> {
  return (props) => {
    const promise = promiseFactory(d1ToKysely(props, kyselyOptions));

    return resultAsyncFromPromise(promise).andThen((id) =>
      id === undefined ? errAsync("not_found" as const) : okAsync(undefined),
    );
  };
}
