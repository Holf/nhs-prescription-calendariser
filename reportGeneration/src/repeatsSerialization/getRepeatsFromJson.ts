import { Repeat } from "@src/Repeat.ts";
import { getRepeatsFromRawRepeats } from "./getRepeatsFromRawRepeats.ts";

export const getRepeatsFromJson = (json: string): Repeat[] => {
  const rawRepeats = JSON.parse(json);

  return getRepeatsFromRawRepeats(rawRepeats);
};
