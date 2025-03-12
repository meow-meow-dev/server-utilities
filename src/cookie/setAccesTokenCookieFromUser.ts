import type { GenerateTokensReturn } from "#auth";
import type { Context } from "hono";

import { getHTTPOnlyCookieOptions } from "#cookie";
import { setCookie } from "hono/cookie";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

type SetAccesTokenCookieFromUserProps<
  Env extends { Bindings: { JWT_SECRET: string | undefined } },
  User,
> = {
  accessTokenCookieName: string;
  c: Context<Env, string, object>;
  tokensGenerator: (
    props: TokenGeneratorProps<User>,
  ) => ResultAsync<GenerateTokensReturn, "internal_server_error">;
  user: User;
};

type TokenGeneratorProps<User> = {
  secret: string;
  user: User;
};

export function setAccesTokenCookieFromUser<
  Env extends { Bindings: { JWT_SECRET: string | undefined } },
  User,
>({
  accessTokenCookieName,
  c,
  tokensGenerator,
  user,
}: SetAccesTokenCookieFromUserProps<Env, User>): ResultAsync<
  string,
  "internal_server_error"
> {
  const { JWT_SECRET } = c.env;
  if (JWT_SECRET === undefined) return errAsync("internal_server_error");

  return tokensGenerator({
    secret: JWT_SECRET,
    user,
  }).andThen(({ accessToken, idToken }) => {
    setCookie(
      c,
      accessTokenCookieName,
      accessToken,
      getHTTPOnlyCookieOptions(),
    );

    return okAsync(idToken);
  });
}
