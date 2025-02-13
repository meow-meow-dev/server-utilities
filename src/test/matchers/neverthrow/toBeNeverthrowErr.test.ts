import { errAsync, okAsync } from "neverthrow";
import { describe, it } from "vitest";

describe("toBeNeverthrowErr", () => {
  it("matches", async ({ expect }) => {
    await expect(okAsync({ id: 1 })).not.toBeNeverthrowErr(
      "internal_server_error",
    );

    await expect(errAsync("not_found")).not.toBeNeverthrowErr(
      "internal_server_error",
    );

    await expect(errAsync("not_found")).toBeNeverthrowErr("not_found");
  });
});
