import { Repeat } from "../Repeat.ts";
import { doseChanges } from "../configuration/doseChanges.ts";
import {
  startingQuantities,
  startingQuantityDate,
} from "../configuration/startingQuantities.ts";
import { difference } from "../deps.ts";

const getSumOfNumberArray = (arrayOfNumbers: number[]) =>
  arrayOfNumbers.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0,
  );

const getIncomingStockCount = (repeats: Repeat[], medicationName: string) => {
  const incomingStockCount = getSumOfNumberArray(
    repeats
      .filter((x) => x.drug.name === medicationName)
      .map((x) => x.calculatedQuantity ?? 0),
  );

  return incomingStockCount;
};

const getCountOfDosesTaken = (
  medicationName: string,
): number => {
  const startingDoseForThisMedication =
    startingQuantities.get(medicationName)?.startingDailyDose ?? 0;

  const doseChangesForThisMedication = doseChanges.get(medicationName) ?? [];

  const relevantDoseChanges = doseChangesForThisMedication.filter((x) =>
    x.dateOfChange > startingQuantityDate
  );

  if (relevantDoseChanges.length === 0) {
    const countOfDays = difference(startingQuantityDate, new Date(), {
      units: ["days"],
    }).days ?? 0;

    return countOfDays * startingDoseForThisMedication;
  }

  return 0;
};

export const getMedicationStockCount = (
  { medicationName, repeats }: { medicationName: string; repeats: Repeat[] },
): number => {
  const startingQuantity = startingQuantities.get(medicationName)?.stockCount ??
    0;

  const repeatsAfterStartingQuantityDate = repeats.filter((x) =>
    x.dateLastIssued > startingQuantityDate
  );

  const incomingStockCount = getIncomingStockCount(
    repeatsAfterStartingQuantityDate,
    medicationName,
  );

  const countOfDosesTaken = getCountOfDosesTaken(medicationName);

  return startingQuantity + incomingStockCount - countOfDosesTaken;
};
