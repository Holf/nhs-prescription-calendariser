import { Repeat } from "../Repeat.ts";
import { extractDigitsAndMultiply } from "./extractDigitsAndMultiply.ts";

export const addCalculatedPropertiesToRepeats = (
  repeats: Repeat[],
): Repeat[] => {
  const withCalculatedProperties = repeats.map((x: Repeat) => {
    const calculatedQuantity = x.calculatedQuantity === undefined
      ? extractDigitsAndMultiply(x.quantityRepresentation)
      : x.calculatedQuantity;

    const calculatedDailyDose = x.calculatedDailyDose === undefined
      ? calculatedQuantity === null ? null : calculatedQuantity / x.duration
      : x.calculatedDailyDose;

    return {
      ...x,
      calculatedQuantity,
      calculatedDailyDose,
    };
  });

  return withCalculatedProperties;
};
