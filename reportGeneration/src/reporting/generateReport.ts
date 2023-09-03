import { getRepeatsOfInterest } from "@src/reporting/getRepeatsOfInterest.ts";
import { getRepeatsFromStorage } from "@src/persistence/getRepeatsFromStorage.ts";
import { getMedicationStockCount } from "@src/reporting/getMedicationStockCount/index.ts";
import { getDateDifferenceInDays } from "@src/utilities/dateUtilities.ts";

const repeatRequestLeadTimeInDays = 7;

export const generateReport = async () => {
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
      const daysUntilRepeatCanBeOrdered =
        getDateDifferenceInDays(nextIssueDate, new Date()) -
        repeatRequestLeadTimeInDays;

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

  const reportItemsWithStockCounts = reportItems.map((x) => {
    const stockCount = getMedicationStockCount({
      medicationName: x.name,
      repeats: collectedRepeats,
    });
    const daysUntilStockIsDepleted = Math.floor(
      stockCount / x.stockInfo.dailyDose,
    );

    return ({
      ...x,
      stockInfo: {
        ...x.stockInfo,
        stockCount,
        daysUntilStockIsDepleted,
      },
    });
  });

  console.log(reportItemsWithStockCounts);
};

await generateReport();
