import "vitest";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface CustomMatchers<R = unknown> {
  toBeHTTPBadRequest: () => Promise<R>;
  toBeHTTPConflict: () => Promise<R>;
  toBeHTTPNotFound: () => Promise<R>;
  toBeHTTPOk: () => Promise<R>;
  toBeHTTPUnauthorized: () => Promise<R>;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
}
