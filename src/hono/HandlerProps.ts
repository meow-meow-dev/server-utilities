import type { Context } from "hono";

export type HandlerAuthentication<PlanSlug extends string> =
  | {
      activePlanSlug: PlanSlug | undefined;
      role: "unprivileged_user";
      userId: string;
    }
  | { activePlanSlug: undefined; role: "administrator"; userId: string };

export type HandlerAuthenticationProps<PlanSlug extends string> = {
  authentication: HandlerAuthentication<PlanSlug>;
};

export type HandlerBucketProps = {
  bucket: R2Bucket;
};

export type HandlerDBProps = {
  db: D1Database;
};

export function authProps<
  Env extends {
    Variables: {
      authentication: HandlerAuthentication<PlanSlug>;
    };
  },
  PlanSlug extends string,
>(c: Context<Env>): HandlerAuthenticationProps<PlanSlug> {
  const { authentication } = c.var;

  return { authentication };
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
