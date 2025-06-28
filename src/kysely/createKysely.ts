import { CamelCasePlugin, Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

export type Env = {
  DB: D1Database;
};

export function createKysely<DB>(env: Env): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
    plugins: [new CamelCasePlugin()],
  });
}
