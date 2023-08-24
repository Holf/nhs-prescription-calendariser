import doseChangesJson from "@src/configuration/doseChanges.json" assert {
  type: "json",
};
import { DoseChange } from "@src/stockCounting/DoseChange.ts";

const doseChanges = doseChangesJson.map((
  { medicationName, doseChanges },
): {
  medicationName: string;
  doseChanges: DoseChange[];
} => ({
  medicationName,
  doseChanges: doseChanges.map(({ dateOfChange, newDailyDose }) => ({
    dateOfChange: new Date(dateOfChange),
    newDailyDose,
  })),
}));

export const getDoseChanges = (medicationName: string) => {
  return doseChanges.find((x) => x.medicationName === medicationName)
    ?.doseChanges;
};

export const getMostRecentDailyDose = (medicationName: string) => {
  const doseChanges = getDoseChanges(medicationName);

  if (
    doseChanges === undefined ||
    doseChanges.length === 0
  ) {
    return Number.NaN;
  }

  const mostRecentDailyDose =
    doseChanges.sort((a, b) =>
      b.dateOfChange.getTime() - a.dateOfChange.getTime()
    )[0].newDailyDose;

  return mostRecentDailyDose;
};
