import { getRepeatsFromJson } from "../repeatsSerialization/getRepeatsFromJson.ts";
import { repeatsDataStoreFilePath } from "./constants.ts";

export const getRepeatsFromStorage = async () => {
  const repeatsJson = await Deno.readTextFile(repeatsDataStoreFilePath);

  return getRepeatsFromJson(repeatsJson);
};
