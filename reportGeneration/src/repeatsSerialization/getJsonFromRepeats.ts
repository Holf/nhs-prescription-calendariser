import { RawRepeat, Repeat } from "../Repeat.ts";

const toUTC = (date: Date) => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000);
};

const stringifyDate = (date: Date): string => {
  return toUTC(date).toISOString().slice(0, -1);
};

export const getJsonFromRepeats = (repeats: Repeat[]): string => {
  const rawRepeats: RawRepeat[] = repeats.map((x: Repeat) => ({
    ...x,
    dateLastIssued: stringifyDate(x.dateLastIssued),
    nextIssueDate: stringifyDate(x.nextIssueDate),
  }));

  return JSON.stringify(rawRepeats, null, 2);
};
