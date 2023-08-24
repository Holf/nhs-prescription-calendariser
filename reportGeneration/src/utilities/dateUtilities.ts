import { difference } from "@src/deps.ts";

export const getDateDifferenceInDays = (date1: Date, date2: Date): number => {
  return difference(date1, date2, {
    units: ["days"],
  }).days ?? 0;
};
