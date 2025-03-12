import type { Context, Env } from "hono";

export type HandlerAuthenticationProps<AccessToken> = {
  accessToken: AccessToken;
};

export type HandlerBucketProps = {
  bucket: R2Bucket;
};

export type HandlerDBProps = {
  db: D1Database;
};

export function authProps<
  AccessToken,
  E extends Env & {
    Variables: {
      accessToken: AccessToken;
    };
  },
>(c: Context<E>): HandlerAuthenticationProps<AccessToken> {
  const { accessToken } = c.var;

  return { accessToken };
}

export function bucketProps<Env extends { Bindings: { BUCKET: R2Bucket } }>(
  c: Context<Env>,
): HandlerBucketProps {
  return { bucket: c.env.BUCKET };
}

export function dbProps<Env extends { Bindings: { DB: D1Database } }>(
  c: Context<Env>,
): HandlerDBProps {
  return { db: c.env.DB };
}
