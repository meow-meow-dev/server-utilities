import {
  administratorRoleSchema,
  identitySchema,
  unprivilegedUserRoleSchema,
  userRoleSchema,
} from "#schemas";
import * as v from "valibot";

// Cf https://docs.stripe.com/api/subscriptions/object#subscription_object-status
// Also https://solmaz.io/stripe-subscription-states

export type ActiveSubscriptionStatus =
  | {
      autoRenew: boolean;
      isTrialing: false;
      stripeStatus: "active";
      type: "active";
    }
  | {
      autoRenew: boolean;
      isTrialing: true;
      stripeStatus: "trialing";
      trialEndDate: Date;
      type: "active";
    };

export type Administrator = {
  email: string;
  id: number;
  identity: Identity;
  role: AdministratorRole;
};

export type AdministratorRole = v.InferOutput<typeof administratorRoleSchema>;

export type DeadSubscriptionStatus = {
  stripeStatus: "canceled" | "expired" | "incomplete_expired";
  type: "dead";
};

export type Identity = v.InferOutput<typeof identitySchema>;

export type InactiveSubscriptionStatus = {
  stripeStatus: string; // Official list: "past_due", "unpaid", "incomplete", "paused" but also "pending"
  type: "inactive";
};

export type Payment = {
  amount: number;
  card: {
    brand: string;
    expiry: {
      month: number;
      year: number;
    };
    last4digits: number;
  };
  currency: string;
  id: number;
  stripeInvoiceId: string;
  timestamp: Date;
  userId: number;
};

export type Subscription<PlanSlug extends string> = {
  endDate: Date;
  id: number;
  planId: string;
  planSlug: PlanSlug;
  startDate: Date;
  status: SubscriptionStatus;
  stripeSubscriptionId: string;
  userId: string;
};

export type SubscriptionStatus =
  | ActiveSubscriptionStatus
  | DeadSubscriptionStatus
  | InactiveSubscriptionStatus;

export type UnprivilegedUserRole = v.InferOutput<
  typeof unprivilegedUserRoleSchema
>;

export type UserRole = v.InferOutput<typeof userRoleSchema>;
