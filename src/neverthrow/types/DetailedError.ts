export type DetailedError<TYPE extends string> = {
  details: string;
  type: TYPE;
};
