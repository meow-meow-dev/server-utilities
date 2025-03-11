import { resultAsyncFromPromise } from "#neverthrow";

import type { BuildKyselyProps } from "./buildKysely.js";
import type { PromiseFactory, Query } from "./QueryProps.js";

import { d1ToKysely } from "./d1ToKysely.js";

export function listQuery<DB, FIELDS extends Record<string, unknown>, OUTPUT>(
  promiseFactory: PromiseFactory<DB, FIELDS, OUTPUT[]>,
  kyselyOptions?: BuildKyselyProps,
): Query<FIELDS, OUTPUT[], "internal_server_error"> {
  return (props) => {
    const promise = promiseFactory(d1ToKysely(props, kyselyOptions));

    return resultAsyncFromPromise(promise);
  };
}
