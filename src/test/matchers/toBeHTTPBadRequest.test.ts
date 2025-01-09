import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPBadRequest", () => {
  it("matches", async ({ expect }) => {
    await expect(client["bad-request"].$get()).toBeHTTPBadRequest();

    await expect(client.ok.$get()).not.toBeHTTPBadRequest();
  });
});
