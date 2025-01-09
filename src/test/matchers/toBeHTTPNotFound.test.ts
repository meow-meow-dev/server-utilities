import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPNotFound", () => {
  it("matches", async ({ expect }) => {
    await expect(client["not-found"].$get()).toBeHTTPNotFound();

    await expect(client.ok.$get()).not.toBeHTTPNotFound();
  });
});
