import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPForbidden", () => {
  it("matches", async ({ expect }) => {
    await expect(client.forbidden.$get()).toBeHTTPForbidden();

    await expect(client.forbidden.$get()).toBeHTTPForbidden("Forbidden");

    await expect(
      client.json.$get({ query: { status: "403" } }),
    ).toBeHTTPForbidden({ status: 403 });

    await expect(client.ok.$get()).not.toBeHTTPForbidden();
  });
});
