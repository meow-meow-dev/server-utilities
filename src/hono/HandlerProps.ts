import type { Context } from "hono";

export type HandlerBucketProps = {
  bucket: R2Bucket;
};

export type HandlerDBProps = {
  db: D1Database;
};

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
