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

  console.log(repeatsOfInterest);
};

await generateReport();
