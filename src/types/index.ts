import {
  administratorRoleSchema,
  identitySchema,
  idTokenSchema,
  registeredUserRoleSchema,
  userRoleSchema,
} from "#schemas";
import { DateTime } from "luxon";
import * as v from "valibot";

export type Administrator = {
  email: string;
  id: number;
  identity: Identity;
  role: AdministratorRole;
};

export type AdministratorRole = v.InferOutput<typeof administratorRoleSchema>;

export type HandlerAuthenticationProps = {
  authentication: {
    userId: number;
  };
};

export type Identity = v.InferOutput<typeof identitySchema>;

export type IdToken = v.InferOutput<typeof idTokenSchema>;

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
  timestamp: DateTime;
  userId: number;
};

export type RegisteredUserRole = v.InferOutput<typeof registeredUserRoleSchema>;

export type UserRole = v.InferOutput<typeof userRoleSchema>;
