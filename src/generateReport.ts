import { difference } from "./deps.ts";

import { getRepeatsOfInterest } from "./getRepeatsOfInterest.ts";
import { getRepeatsFromStorage } from "./persistence/getRepeatsFromStorage.ts";

// const prettifyDate = (dateString: string) => {
//   const date = new Date(dateString);
//   const prettyDate = date.toLocaleString("default", { month: "short" });

//   return prettyDate;
// };

export const generateReport = async () => {
  const repeats = await getRepeatsFromStorage();

  const repeatsOfInterest = getRepeatsOfInterest(repeats);

  const reportItems = repeatsOfInterest.map(
    ({ nextIssueDate, drug: { name }, calculatedDailyDose }) => {
      const daysUntilNextIssue =
        difference(nextIssueDate, new Date(), { units: ["days"] })
          .days;

      return {
        name,
        nextIssueDate: nextIssueDate.toLocaleString(),
        daysUntilNextIssue,
        calculatedDailyDose,
      };
    },
  );

  console.log(reportItems);
};

await generateReport();
