import { ResultAsync } from "neverthrow";

export async function unsafeUnwrapErr<T, E>(
  result: ResultAsync<T, E>,
): Promise<E> {
  return (await result)._unsafeUnwrapErr();
}
