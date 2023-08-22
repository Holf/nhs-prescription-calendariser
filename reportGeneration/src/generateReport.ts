import { difference } from "./deps.ts";

import { getRepeatsOfInterest } from "./getRepeatsOfInterest.ts";
import { getRepeatsFromStorage } from "./persistence/getRepeatsFromStorage.ts";

const repeatRequestLeadTimeInDays = 7;

// const prettifyDate = (dateString: string) => {
//   const date = new Date(dateString);
//   const prettyDate = date.toLocaleString("default", { month: "short" });

//   return prettyDate;
// };

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
        ((difference(nextIssueDate, new Date(), { units: ["days"] })
          .days) ?? 0) - repeatRequestLeadTimeInDays;

      return {
        name,
        dateLastIssued: dateLastIssued.toDateString(),
        nextIssueDate: nextIssueDate.toDateString(),
        daysUntilRepeatCanBeOrdered,
        calculatedDailyDose,
        errors,
      };
    },
  );

  console.log(reportItems);
};

await generateReport();
