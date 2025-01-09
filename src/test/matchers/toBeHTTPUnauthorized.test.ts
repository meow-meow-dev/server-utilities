import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPUnauthorized", () => {
  it("matches", async ({ expect }) => {
    await expect(client.unauthorized.$get()).toBeHTTPUnauthorized();

    await expect(client.ok.$get()).not.toBeHTTPUnauthorized();
  });
});
