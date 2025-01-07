import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "cookie",
    "http/headers",
    "http/search_params",
    "http/status",
    "jwt",
    "kysely",
    "oauth_providers",
    "validation",
  ].map((folder) => `./src/${folder}/index.ts`),
  format: "esm",
  outExtension() {
    return {
      js: `.mjs`,
    };
  },
  sourcemap: true,
  splitting: false,
  target: "node22",
});
