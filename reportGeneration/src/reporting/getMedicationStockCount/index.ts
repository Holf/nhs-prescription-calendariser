import { Repeat } from "@src/Repeat.ts";

import { getCountOfIncomingStock } from "./getCountOfIncomingStock.ts";
import { getCountOfDosesTaken } from "./getCountOfDosesTaken.ts";
import {
  getStartingQuantity,
  startingQuantityDate,
} from "@src/stockCounting/getStartingQuantity.ts";

export const getMedicationStockCount = (
  { medicationName, repeats }: { medicationName: string; repeats: Repeat[] },
): number => {
  const startingQuantity = getStartingQuantity(medicationName)?.stockCount ??
    Number.NaN;

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
