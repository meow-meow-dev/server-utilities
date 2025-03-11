import type { PromiseFactory, Query } from "./QueryProps.js";

import { d1ToKysely } from "./d1ToKysely.js";
import { resultAsyncFromPromise } from "./resultAsyncFromPromise.js";

export function listQuery<DB, FIELDS extends Record<string, unknown>, OUTPUT>(
  promiseFactory: PromiseFactory<DB, FIELDS, OUTPUT[]>,
): Query<FIELDS, OUTPUT[], "internal_server_error"> {
  return (props) => {
    const promise = promiseFactory(d1ToKysely(props));

    return resultAsyncFromPromise(promise);
  };
}
