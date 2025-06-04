import type {
  IdTokenPayload,
  SubjectFactory,
  WithoutJwtTimeStamps,
} from "#auth/jwt/types";

type GenerateTokensProps = {
  subjectFactory: SubjectFactory;
  user: {
    email: string;
    id: number;
    identity: {
      firstName: string;
      lastName: string;
    };
    role: "administrator" | "registered_user";
  };
};

export function generateIdToken({
  subjectFactory,
  user: {
    email,
    id,
    identity: { firstName, lastName },
    role,
  },
}: GenerateTokensProps): WithoutJwtTimeStamps<IdTokenPayload> {
  const sub = subjectFactory(id);

  return {
    email,
    family_name: lastName,
    given_name: firstName,
    role,
    sub,
  };
}
