import { describe, it } from "vitest";

import { client } from "./client.js";

describe("toBeHTTPNotFound", () => {
  it("matches", async ({ expect }) => {
    await expect(client["not-found"].$get()).toBeHTTPNotFound();

    await expect(client["not-found"].$get()).toBeHTTPNotFound("Not Found");

    await expect(
      client.json.$get({ query: { status: "404" } }),
    ).toBeHTTPNotFound({ status: 404 });

    await expect(client.ok.$get()).not.toBeHTTPNotFound();
  });
});
