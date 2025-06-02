import { sign, verify } from "hono/jwt";
import { JwtTokenExpired, JwtTokenNotBefore } from "hono/utils/jwt/types";
import { afterEach, beforeEach, describe, it, vi } from "vitest";

import { seconds } from "./duration.js";
import { buildJwtPayloadTimestamps } from "./JwtPayloadTimestamps.js";

const secret =
  "78588851133e48f92cd210e963bdffa5a59b50de895866db3a32c63fb0e66f816eeff20824d946bc1ccdf880455c8acff980f82c4891bc1377f2f8eb56b47d27635e46630cca6934903d4020439f564ad2b2f428854967ea6a214a16ee87e1f3b801caac542ba6e75c690f0aa1ecb760584e6e20c8ca040e002e3541e1414156363c09a15c1c5906eb04ff5dd564ad1d5c1bbd7c509a5c0a4c9dc5005b0c13bc4de50c313325413648390eb5851a8a1f1333826b0acdaec11e791fbf87e2ecccb4a501275e7ada8f6543642bd7d03df66ac1e9c2b01dcc1daf1857661c0ca1f1c2f648f9db88e9c6e0a7e7a26c966fe6305771bba282795ab6c4495347687fa0";

const payload = {
  email: "a@b.com",
};

describe("buildJwtPayloadTimestamps", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it("correctly computes exp and nbf", ({ expect }) => {
    vi.setSystemTime(new Date(Date.UTC(2025, 1, 1)));

    const timestamps = buildJwtPayloadTimestamps({ expiry: seconds(30) });

    expect(timestamps).toEqual({
      exp: 1_738_368_000 + 30,
      iat: 1_738_368_000,
      nbf: 1_738_368_000,
    });
  });

  it("correctly rejects Jwt based on timestamps", async ({ expect }) => {
    vi.setSystemTime(new Date(Date.UTC(2025, 1, 1)));

    const timestamps = buildJwtPayloadTimestamps({ expiry: seconds(30) });
    const Jwt = await sign({ ...payload, ...timestamps }, secret);

    vi.setSystemTime(new Date(Date.UTC(2025, 1, 1, 0, 0, 25)));

    const decodedPayload = await verify(Jwt, secret);

    expect(decodedPayload).toMatchObject(payload);

    vi.setSystemTime(new Date(Date.UTC(2025, 1, 1, 0, 0, 35)));

    await expect(() => verify(Jwt, secret)).rejects.toThrowError(
      JwtTokenExpired,
    );

    vi.setSystemTime(new Date(Date.UTC(2024, 12, 31, 23, 59, 59)));

    await expect(async () => verify(Jwt, secret)).rejects.toThrowError(
      JwtTokenNotBefore,
    );
  });
});
