import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPConflict", () => {
  it("matches", async ({ expect }) => {
    await expect(client.conflict.$get()).toBeHTTPConflict();

    await expect(client.conflict.$get()).toBeHTTPConflict({
      text: "Conflict",
    });

    await expect(
      client.json.$get({ query: { status: "409" } }),
    ).toBeHTTPConflict({ json: { status: 409 } });

    await expect(client.ok.$get()).not.toBeHTTPConflict();
  });
});
