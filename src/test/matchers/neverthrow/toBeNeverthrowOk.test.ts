import { errAsync, okAsync } from "neverthrow";
import { describe, it } from "vitest";

describe("toBeNeverthrowOk", () => {
  it("matches", async ({ expect }) => {
    await expect(errAsync("not_found")).not.toBeNeverthrowOk({ id: 1 });

    await expect(okAsync({ id: 2 })).not.toBeNeverthrowOk({ id: 1 });

    await expect(okAsync({ id: 1 })).toBeNeverthrowOk({ id: 1 });
  });
});
