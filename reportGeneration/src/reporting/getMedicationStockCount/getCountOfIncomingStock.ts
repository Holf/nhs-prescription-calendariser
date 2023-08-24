import { Repeat } from "@src/Repeat.ts";

const getSumOfNumberArray = (arrayOfNumbers: number[]) =>
  arrayOfNumbers.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0,
  );
export const getCountOfIncomingStock = (
  repeats: Repeat[],
  medication_Name: string,
) => {
  const countOfIncomingStock = getSumOfNumberArray(
    repeats
      .filter((x) => x.drug.name === medication_Name)
      .map((x) => x.calculatedQuantity ?? 0),
  );

  return countOfIncomingStock;
};
