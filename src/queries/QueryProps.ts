import type { Kysely } from "kysely";
import type { ResultAsync } from "neverthrow";

export type PromiseFactory<
  DB,
  FIELDS extends Record<string, unknown>,
  OUTPUT,
> = (props: QueryProps<Kysely<DB>, FIELDS>) => Promise<OUTPUT>;

export type Query<FIELDS extends Record<string, unknown>, OUTPUT, ERROR> = (
  props: QueryProps<D1Database, FIELDS>,
) => ResultAsync<OUTPUT, ERROR>;

export type QueryProps<DB, FIELDS extends Record<string, unknown>> = FIELDS & {
  db: DB;
};
