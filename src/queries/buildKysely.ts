import type { LogConfig } from "kysely";
import type { Deserializer, Serializer } from "kysely-plugin-serialize";

import { D1Dialect } from "@noxharmonium/kysely-d1";
import { CamelCasePlugin, Kysely } from "kysely";
import { BaseSerializePlugin, dateRegex } from "kysely-plugin-serialize";

export type BuildKyselyProps = {
  log?: LogConfig;
};

const serializer: Serializer = (parameter) => {
  if (parameter instanceof Date) return parameter.toISOString();
  return parameter;
};

const deserializer: Deserializer = (parameter) => {
  if (typeof parameter === "string" && dateRegex.test(parameter)) {
    return new Date(parameter);
  }
  return parameter;
};

const serializePlugin = new BaseSerializePlugin(serializer, deserializer, []);

export function buildKysely<DB>(
  database: D1Database,
  props?: BuildKyselyProps,
): Kysely<DB> {
  return new Kysely<DB>({
    ...props,
    dialect: new D1Dialect({ database }),
    plugins: [new CamelCasePlugin(), serializePlugin],
  });
}
