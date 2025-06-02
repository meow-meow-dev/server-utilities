import { describe, it } from "vitest";

import { addDurationToDate } from "./addDurationToDate.js";
import { weeks } from "./duration.js";

describe("addDurationToDate", () => {
  it("Correctly computes new date", ({ expect }) => {
    expect(addDurationToDate(new Date(2025, 0, 1), weeks(2)).getTime()).toEqual(
      new Date(2025, 0, 15).getTime(),
    );
  });
});
