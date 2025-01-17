import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["src/**/index.ts", "src/**/*.test.ts"],
      include: ["src/**/*.ts", "samples/**/*ts"],
      provider: "istanbul",
    },
    setupFiles: ["src/test/setup/index.ts"],
  },
});
