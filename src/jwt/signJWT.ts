import { sign } from "hono/jwt";

type SignJWTOptions = {
  expiryInSeconds?: number;
};

export function signJWT(
  payload: Record<string, unknown>,
  secret: string,
  options?: SignJWTOptions,
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000); // number of seconds since epoch
  const exp =
    options?.expiryInSeconds === undefined
      ? undefined
      : iat + options.expiryInSeconds;

  return sign({ ...payload, exp, iat }, secret);
}
