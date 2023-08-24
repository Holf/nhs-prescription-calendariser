import { assertEquals } from "@src/deps.ts";
import { extractDigitsAndMultiply } from "./extractDigitsAndMultiply.ts";

const scenarios: [string, number | null][] = [
  ["String with no digits", null],
  ["56 capsule", 56],
  ["112 lozenge", 112],
  ["3 x 28 capsule", 84],
];

scenarios.forEach(([input, expected]) => {
  Deno.test(`String '${input}' should give result '${expected}'`, () => {
    assertEquals(extractDigitsAndMultiply(input), expected);
  });
});
