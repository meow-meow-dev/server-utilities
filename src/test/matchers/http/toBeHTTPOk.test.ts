import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPOk", () => {
  it("matches", async ({ expect }) => {
    await expect(client.ok.$get()).toBeHTTPOk();

    await expect(client.ok.$get()).toBeHTTPOk("OK");

    await expect(client.json.$get({ query: { status: "200" } })).toBeHTTPOk({
      status: 200,
    });

    await expect(client["bad-request"].$get()).not.toBeHTTPOk();
  });
});
