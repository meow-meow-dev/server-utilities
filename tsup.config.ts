import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "http/cookie",
    "http/headers",
    "http/status",
    "http/search_params",
    "jwt",
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
