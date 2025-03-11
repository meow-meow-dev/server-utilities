import type { Kysely } from "kysely";

import type { QueryProps } from "./QueryProps.js";

import { buildKysely, BuildKyselyProps } from "./buildKysely.js";

export function d1ToKysely<DB, FIELDS extends Record<string, unknown>>(
  props: QueryProps<D1Database, FIELDS>,
  kyselyOptions?: BuildKyselyProps,
): QueryProps<Kysely<DB>, FIELDS> {
  const kysely = buildKysely<DB>(props.db, kyselyOptions);

  return { ...props, db: kysely };
}
