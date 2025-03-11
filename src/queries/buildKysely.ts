import type { LogConfig } from "kysely";

import { D1Dialect } from "@noxharmonium/kysely-d1";
import { CamelCasePlugin, Kysely } from "kysely";

export type BuildKyselyProps = {
  log?: LogConfig;
};

export function buildKysely<DB>(
  database: D1Database,
  props?: BuildKyselyProps,
): Kysely<DB> {
  return new Kysely<DB>({
    ...props,
    dialect: new D1Dialect({ database }),
    plugins: [new CamelCasePlugin()],
  });
}
