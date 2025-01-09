import { describe, it } from "vitest";

import { days, hours, minutes, seconds, weeks } from "./duration.js";

describe("duration", () => {
  it("correctly build standard units", ({ expect }) => {
    expect(seconds(10)).toEqual({ unit: "seconds", value: 10 });

    expect(minutes(5)).toEqual({ unit: "seconds", value: 5 * 60 });

    expect(hours(24)).toEqual({ unit: "seconds", value: 24 * 60 * 60 });

    expect(days(7)).toEqual({ unit: "seconds", value: 7 * 24 * 60 * 60 });

    expect(weeks(1)).toEqual({ unit: "seconds", value: 7 * 24 * 60 * 60 });
  });
});
