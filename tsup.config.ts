import { globSync } from "fs";
import { defineConfig } from "tsup";

const entry = globSync("./src/**/index.ts").filter(
  (name) => !name.includes("src/test/setup"),
);

export default defineConfig({
  clean: true,
  entry,
  experimentalDts: true,
  format: "esm",
  outExtension() {
    return {
      js: `.mjs`,
    };
  },
  sourcemap: false,
  splitting: false,
  target: "node22",
});
