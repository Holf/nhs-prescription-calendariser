import { Repeat } from "@src/Repeat.ts";
import { getJsonFromRepeats } from "@src/repeatsSerialization/getJsonFromRepeats.ts";
import { repeatsDataStoreFilePath } from "@src/persistence/constants.ts";

export const persistRepeatsToStorage = async (
  repeats: Repeat[],
): Promise<void> => {
  const repeatsJson = getJsonFromRepeats(repeats);

  await Deno.writeTextFile(
    repeatsDataStoreFilePath,
    repeatsJson,
  );
};
