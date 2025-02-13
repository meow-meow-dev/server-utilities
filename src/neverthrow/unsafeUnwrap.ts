import { ResultAsync } from "neverthrow";

export async function unsafeUnwrap<T, E>(
  result: ResultAsync<T, E>,
): Promise<T> {
  return (await result)._unsafeUnwrap();
}
