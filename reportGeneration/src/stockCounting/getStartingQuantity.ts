import startingQuantitiesJson from "@src/configuration/startingQuantities.json" assert {
  type: "json",
};

import { MedicationStartDatum } from "@src/stockCounting/MedicationStartDatum.ts";

const { startingQuantityDate: startingQuantityDateString, startingQuantities } =
  startingQuantitiesJson;

export const startingQuantityDate = new Date(startingQuantityDateString);

export const getStartingQuantity = (
  medicationName: string,
): MedicationStartDatum | undefined =>
  startingQuantities.find((x) => x.medicationName === medicationName)
    ?.medicationStartDatum;
