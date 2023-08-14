import config from "./config.json" assert { type: "json" };

import { Repeat } from "./Repeat.ts";

const { medicationsOfInterest } = config;

const medicationsOfInterestRegExp = new RegExp(
  medicationsOfInterest.join("|"),
  "i",
);

export const getRepeatsOfInterest = (repeats: Repeat[]) => {
  return repeats.filter((repeat) =>
    medicationsOfInterestRegExp.test(repeat.drug.name)
  );
};
