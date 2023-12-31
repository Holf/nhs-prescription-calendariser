import { getDateDifferenceInDays } from "@src/utilities/dateUtilities.ts";
import { getDoseChanges } from "@src/stockCounting/getDoseChanges.ts";

import {
  getStartingQuantity,
  startingQuantityDate,
} from "@src/stockCounting/getStartingQuantity.ts";

export const getCountOfDosesTaken = (
  medicationName: string,
): number => {
  const medicationStartDatum = getStartingQuantity(medicationName);

  const doseChangesForThisMedication = getDoseChanges(medicationName) ?? [];

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
