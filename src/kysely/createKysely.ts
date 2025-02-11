import type { D1Database } from "@cloudflare/workers-types";

import { D1Dialect } from "@noxharmonium/kysely-d1";
import { CamelCasePlugin, Kysely } from "kysely";

export type Env = {
  DB: D1Database;
};

export function createKysely<DB>(env: Env): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
    plugins: [new CamelCasePlugin()],
  });
}
