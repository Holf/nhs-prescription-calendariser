import { getRepeatsOfInterest } from "@src/reporting/getRepeatsOfInterest.ts";
import { getRepeatsFromStorage } from "@src/persistence/getRepeatsFromStorage.ts";
import { getMedicationStockCount } from "@src/reporting/getMedicationStockCount/index.ts";
import { getDateDifferenceInDays } from "@src/utilities/dateUtilities.ts";

const repeatRequestLeadTimeInDays = 7;

export const generateReportData = async () => {
  const repeats = await getRepeatsFromStorage();

  const repeatsOfInterest = getRepeatsOfInterest(repeats);

  const reportItems = repeatsOfInterest.map(
    (
      {
        dateLastIssued,
        nextIssueDate,
        drug: { name },
        calculatedDailyDose,
        errors,
      },
    ) => {
      const daysUntilRepeatCanBeOrdered = Math.max(
        getDateDifferenceInDays(nextIssueDate, new Date()) -
          repeatRequestLeadTimeInDays,
        0,
      );

      return {
        name,
        prescriptionInfo: {
          dateLastIssued: dateLastIssued.toDateString(),
          nextIssueDate: nextIssueDate.toDateString(),
          daysUntilRepeatCanBeOrdered,
        },
        stockInfo: {
          dailyDose: calculatedDailyDose ?? Number.NaN,
        },
        errors,
      };
    },
  );

  const collectedRepeats = repeats.filter((x) => x.collected === true);

  const reportItemsWithStockCounts = reportItems.map((reportItem) => {
    const stockCount = getMedicationStockCount({
      medicationName: reportItem.name,
      repeats: collectedRepeats,
    });

    const daysUntilStockIsDepleted = Math.floor(
      stockCount / reportItem.stockInfo.dailyDose,
    );

    // TODO: There should never be more than one uncollected repeat for
    // any medication... maybe we should add an error, here, if we find
    // there is?
    const uncollectedStockCount = repeats.find((repeat) =>
      repeat.collected === false && repeat.drug.name === reportItem.name
    )?.calculatedQuantity ?? null;

    return ({
      ...reportItem,
      stockInfo: {
        ...reportItem.stockInfo,
        stockCount,
        daysUntilStockIsDepleted,
        uncollectedStockCount,
      },
    });
  });

  return reportItemsWithStockCounts;
};
