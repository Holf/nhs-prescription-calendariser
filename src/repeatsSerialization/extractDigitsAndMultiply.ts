/**
 * Extracts digits from a string and multiplies them together.
 *
 * @param inputString - A string containing zero or more digits, e.g.:
 *
 * `"56 capsule"`
 *
 * `"112 lozenge"`
 *
 * `"4 x 28 capsule"`
 * @returns The product of all the extracted digits, multiplied.
 *
 * @example
 * ```typescript
 * const result: number = extractDigitsAndMultiply("4 x 28 capsule");
 * console.log(result); // Outputs: 112
 * ```
 */
export const extractDigitsAndMultiply = (inputString: string) => {
  const digitStrings = inputString.match(/\d+/g);
  const digitNumbers = digitStrings ? digitStrings.map(Number) : null;

  if (digitNumbers === null) {
    return null;
  }

  const multiplied = digitNumbers.reduce((total, number) => total * number, 1);

  return multiplied;
};
