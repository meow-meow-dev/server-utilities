/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    conditions: ["dev"],
  },
  test: {
    coverage: {
      exclude: ["src/**/index.ts", "src/**/*.test.ts"],
      include: ["src/**/*.ts", "samples/**/*ts"],
      provider: "istanbul",
    },
    setupFiles: ["src/test/setup/index.ts"],
  },
});
