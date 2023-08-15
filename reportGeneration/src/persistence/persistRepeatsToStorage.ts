import { Repeat } from "../Repeat.ts";
import { getJsonFromRepeats } from "../repeatsSerialization/getJsonFromRepeats.ts";
import { repeatsDataStoreFilePath } from "./constants.ts";

export const persistRepeatsToStorage = async (
  repeats: Repeat[],
): Promise<void> => {
  const repeatsJson = getJsonFromRepeats(repeats);

  await Deno.writeTextFile(
    repeatsDataStoreFilePath,
    repeatsJson,
  );
};
