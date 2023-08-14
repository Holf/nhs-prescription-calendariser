import { RawRepeat, Repeat } from "../Repeat.ts";

export const getRepeatsFromRawRepeats = (rawRepeats: RawRepeat[]): Repeat[] => {
  const repeats: Repeat[] = rawRepeats.map((x: RawRepeat) => {
    return {
      ...x,
      dateLastIssued: new Date(x.dateLastIssued),
      nextIssueDate: new Date(x.nextIssueDate),
    };
  });

  return repeats;
};
