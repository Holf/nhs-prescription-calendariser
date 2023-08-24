import { Repeat } from "@src/Repeat.ts";
import { extractDigitsAndMultiply } from "./extractDigitsAndMultiply.ts";

import { startingQuantities } from "@src/configuration/startingQuantities.ts";
import { getMostRecentDailyDose } from "@src/stockCounting/getDoseChanges.ts";

export const addCalculatedPropertiesToRepeats = (
  repeats: Repeat[],
): Repeat[] => {
  const withCalculatedProperties = repeats.map((repeat: Repeat) => {
    const calculatedQuantity = extractDigitsAndMultiply(
      repeat.quantityRepresentation,
    );

    if (Number.isNaN(calculatedQuantity)) {
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

    const expectedDailyDose = getMostRecentDailyDose(repeat.drug.name) ??
      startingQuantities.get(repeat.drug.name)?.startingDailyDose ?? Number.NaN;

    // const expectedDailyDose = config.medications.find((medication) =>
    //   medication.name === repeat.drug.name
    // )?.expectedDailyDose;

    if (expectedDailyDose && expectedDailyDose !== calculatedDailyDose) {
      repeat.errors.push(
        `Calculated Daily Dose of ${calculatedDailyDose} does not match most recent Daily Dose of ${expectedDailyDose}. Using most recent Daily Dose.`,
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
