export type ExpectationResult = {
  // If you pass these, they will automatically appear inside a diff when
  // the matcher does not pass, so you don't need to print the diff yourself
  actual?: unknown;
  expected?: unknown;
  message: () => string;
  pass: boolean;
};
