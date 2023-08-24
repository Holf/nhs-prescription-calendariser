import config from "@src/configuration/config.json" assert { type: "json" };

import { Repeat } from "@src/Repeat.ts";

const { medicationsOfInterest } = config;

const medicationsOfInterestRegExp = new RegExp(
  medicationsOfInterest.join("|"),
  "i",
);

export const getRepeatsOfInterest = (repeats: Repeat[]) => {
  const repeatsOfInterest = repeats.filter((repeat) =>
    medicationsOfInterestRegExp.test(repeat.drug.name)
  );

  repeatsOfInterest.sort((a, b) =>
    a.dateLastIssued.getTime() - b.dateLastIssued.getTime()
  );

  const mostRecentRepeats = new Map<string, Repeat>();

  repeatsOfInterest.forEach((repeat) =>
    mostRecentRepeats.set(repeat.drug.name, repeat)
  );

  return Array.from(mostRecentRepeats.values());
};
