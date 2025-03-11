import { D1Dialect } from "@noxharmonium/kysely-d1";
import { CamelCasePlugin, Kysely } from "kysely";

export function buildKysely<DB>(database: D1Database): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new D1Dialect({ database }),
    log: ["query", "error"],
    plugins: [new CamelCasePlugin()],
  });
}
