import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPBadRequest", () => {
  it("matches", async ({ expect }) => {
    await expect(client["bad-request"].$get()).toBeHTTPBadRequest();

    await expect(await client["bad-request"].$get()).toBeHTTPBadRequest();

    await expect(client["bad-request"].$get()).toBeHTTPBadRequest(
      "Bad Request",
    );

    await expect(await client["bad-request"].$get()).toBeHTTPBadRequest(
      "Bad Request",
    );

    await expect(
      client.json.$get({ query: { status: "400" } }),
    ).toBeHTTPBadRequest({ status: 400 });

    await expect(
      await client.json.$get({ query: { status: "400" } }),
    ).toBeHTTPBadRequest({ status: 400 });

    await expect(client.ok.$get()).not.toBeHTTPBadRequest();
    await expect(await client.ok.$get()).not.toBeHTTPBadRequest();
  });
});
