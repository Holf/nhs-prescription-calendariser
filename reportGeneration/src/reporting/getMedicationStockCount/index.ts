import { Repeat } from "@src/Repeat.ts";
import {
  startingQuantities,
  startingQuantityDate,
} from "@src/configuration/startingQuantities.ts";
import { getCountOfIncomingStock } from "./getCountOfIncomingStock.ts";
import { getCountOfDosesTaken } from "./getCountOfDosesTaken.ts";

export const getMedicationStockCount = (
  { medicationName, repeats }: { medicationName: string; repeats: Repeat[] },
): number => {
  const startingQuantity = startingQuantities.get(medicationName)?.stockCount ??
    0;

  const repeatsAfterStartingQuantityDate = repeats.filter((x) =>
    x.dateLastIssued > startingQuantityDate
  );

  const countOfIncomingStock = getCountOfIncomingStock(
    repeatsAfterStartingQuantityDate,
    medicationName,
  );

  const countOfDosesTaken = getCountOfDosesTaken(medicationName);

  return startingQuantity + countOfIncomingStock - countOfDosesTaken;
};
