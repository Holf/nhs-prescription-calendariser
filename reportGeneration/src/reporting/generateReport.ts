import { getRepeatsOfInterest } from "./getRepeatsOfInterest.ts";
import { getRepeatsFromStorage } from "../persistence/getRepeatsFromStorage.ts";
import { getMedicationStockCount } from "./getMedicationStockCount.ts";
import { getDateDifferenceInDays } from "../utilities/dateUtilities.ts";

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
        dateLastIssued: dateLastIssued.toDateString(),
        nextIssueDate: nextIssueDate.toDateString(),
        daysUntilRepeatCanBeOrdered,
        dailyDose: calculatedDailyDose,
        errors,
      };
    },
  );

  const reportItemsWithStockCounts = reportItems.map((x) => ({
    ...x,
    stockCount: getMedicationStockCount({ medicationName: x.name, repeats }),
  }));

  console.log(reportItemsWithStockCounts);
};

await generateReport();
