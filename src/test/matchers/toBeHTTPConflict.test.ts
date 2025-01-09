import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPConflict", () => {
  it("matches", async ({ expect }) => {
    await expect(client.conflict.$get()).toBeHTTPConflict();

    await expect(client.ok.$get()).not.toBeHTTPConflict();
  });
});
