import { RawRepeat, Repeat } from "../Repeat.ts";

export const getRepeatsFromJson = (json: string): Repeat[] => {
  const rawRepeats = JSON.parse(json);

  return getRepeatsFromRawRepeats(rawRepeats);
};

export const getRepeatsFromRawRepeats = (rawRepeats: RawRepeat[]): Repeat[] => {
  const repeats: Repeat[] = rawRepeats.map((x: RawRepeat) => ({
    ...x,
    dateLastIssued: new Date(x.dateLastIssued),
    nextIssueDate: new Date(x.nextIssueDate),
  }));

  return repeats;
};
