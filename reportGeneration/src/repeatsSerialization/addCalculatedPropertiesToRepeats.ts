import { Repeat } from "../Repeat.ts";
import { extractDigitsAndMultiply } from "./extractDigitsAndMultiply.ts";

import config from "../config.json" assert { type: "json" };

export const addCalculatedPropertiesToRepeats = (
  repeats: Repeat[],
): Repeat[] => {
  const withCalculatedProperties = repeats.map((repeat: Repeat) => {
    const calculatedQuantity = extractDigitsAndMultiply(
      repeat.quantityRepresentation,
    );

    if (calculatedQuantity === null) {
      repeat.errors.push(
        "Quantity could not be extracted from 'quantityRepresentation'.",
      );

      return {
        ...repeat,
        calculatedQuantity,
        calculatedDailyDose: null,
      };
    }

    const calculatedDailyDose = calculatedQuantity / repeat.duration;
    const expectedDailyDose = config.medications.find((medication) =>
      medication.name === repeat.drug.name
    )?.expectedDailyDose;

    if (expectedDailyDose && expectedDailyDose !== calculatedDailyDose) {
      repeat.errors.push(
        `Calculated Daily Dose of ${calculatedDailyDose} does not match Expected Daily Dose of ${expectedDailyDose}. Using Expected Daily Dose.`,
      );

      return {
        ...repeat,
        calculatedQuantity,
        calculatedDailyDose: expectedDailyDose,
      };
    }

    return {
      ...repeat,
      calculatedQuantity,
      calculatedDailyDose,
    };
  });

  return withCalculatedProperties;
};
