import { errAsync, okAsync } from "neverthrow";

import type { PromiseFactory, Query } from "./QueryProps.js";

import { d1ToKysely } from "./d1ToKysely.js";
import { resultAsyncFromPromise } from "./resultAsyncFromPromise.js";

export function createQuery<DB, FIELDS extends Record<string, unknown>, OUTPUT>(
  promiseFactory: PromiseFactory<DB, FIELDS, OUTPUT | undefined>,
): Query<FIELDS, OUTPUT, "internal_server_error"> {
  return (props) => {
    const promise = promiseFactory(d1ToKysely(props));

    return resultAsyncFromPromise(promise).andThen((output) =>
      output === undefined
        ? errAsync("internal_server_error" as const)
        : okAsync(output),
    );
  };
}
