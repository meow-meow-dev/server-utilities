import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPUnauthorized", () => {
  it("matches", async ({ expect }) => {
    await expect(client.unauthorized.$get()).toBeHTTPUnauthorized();

    await expect(client.unauthorized.$get()).toBeHTTPUnauthorized(
      "Unauthorized",
    );

    await expect(
      client.json.$get({ query: { status: "401" } }),
    ).toBeHTTPUnauthorized({ status: 401 });

    await expect(client.ok.$get()).not.toBeHTTPUnauthorized();
  });
});
