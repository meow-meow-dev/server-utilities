import type { Kysely } from "kysely";

import type { QueryProps } from "./QueryProps.js";

import { buildKysely } from "./buildKysely.js";

export function d1ToKysely<DB, FIELDS extends Record<string, unknown>>(
  props: QueryProps<D1Database, FIELDS>,
): QueryProps<Kysely<DB>, FIELDS> {
  const kysely = buildKysely<DB>(props.db);

  return { ...props, db: kysely };
}
