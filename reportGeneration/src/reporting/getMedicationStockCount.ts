import { Repeat } from "../Repeat.ts";
import { doseChanges } from "../configuration/doseChanges.ts";
import {
  startingQuantities,
  startingQuantityDate,
} from "../configuration/startingQuantities.ts";
import { getDateDifferenceInDays } from "../utilities/dateUtilities.ts";

const getSumOfNumberArray = (arrayOfNumbers: number[]) =>
  arrayOfNumbers.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0,
  );

const getCountOfIncomingStock = (repeats: Repeat[], medicationName: string) => {
  const countOfIncomingStock = getSumOfNumberArray(
    repeats
      .filter((x) => x.drug.name === medicationName)
      .map((x) => x.calculatedQuantity ?? 0),
  );

  return countOfIncomingStock;
};

const getCountOfDosesTaken = (
  medicationName: string,
): number => {
  const medicationStartDatum = startingQuantities.get(medicationName);

  const doseChangesForThisMedication = doseChanges.get(medicationName) ?? [];

  const relevantDoseChanges = [
    {
      dateOfChange: startingQuantityDate,
      newDailyDose: medicationStartDatum?.startingDailyDose ?? 0,
    },
    ...doseChangesForThisMedication.filter((x) =>
      x.dateOfChange > startingQuantityDate
    ),
  ];

  return relevantDoseChanges.reduce(
    (cumulativeDoseCount, currentDoseChange, currentIndex, array) => {
      const nextDoseChange = array[currentIndex + 1];

      if (nextDoseChange === undefined) {
        const dayCount = getDateDifferenceInDays(
          currentDoseChange.dateOfChange,
          new Date(),
        );

        const additionalDoseCount = currentDoseChange.newDailyDose * dayCount;

        return cumulativeDoseCount + additionalDoseCount;
      }

      const dayCount = getDateDifferenceInDays(
        currentDoseChange.dateOfChange,
        nextDoseChange.dateOfChange,
      );

      const additionalDoseCount = currentDoseChange.newDailyDose * dayCount;

      return cumulativeDoseCount + additionalDoseCount;
    },
    0,
  );
};

export const getMedicationStockCount = (
  { medicationName, repeats }: { medicationName: string; repeats: Repeat[] },
): number => {
  const startingQuantity = startingQuantities.get(medicationName)?.stockCount ??
    0;

  const repeatsAfterStartingQuantityDate = repeats.filter((x) =>
    x.dateLastIssued > startingQuantityDate
  );

  const countOfIncomingStock = getCountOfIncomingStock(
    repeatsAfterStartingQuantityDate,
    medicationName,
  );

  const countOfDosesTaken = getCountOfDosesTaken(medicationName);

  return startingQuantity + countOfIncomingStock - countOfDosesTaken;
};
