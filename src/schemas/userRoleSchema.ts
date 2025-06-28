import { administratorRole, unprivilegedUserRole } from "#constants/";
import * as v from "valibot";

export const administratorRoleSchema = v.literal(administratorRole);
export const unprivilegedUserRoleSchema = v.literal(unprivilegedUserRole);

export const userRoleSchema = v.union([
  administratorRoleSchema,
  unprivilegedUserRoleSchema,
]);
