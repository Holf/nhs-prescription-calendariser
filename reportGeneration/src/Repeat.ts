type CoreRepeat = {
  drug: {
    id: string;
    name: string;
    details: string;
    constituents: unknown[];
  };

  reviewDate: string | null;
  dateLastIssuedNotKnown: boolean;
  duration: number;
  isPending: boolean;
  quantityRepresentation: string;
  unStructuredDescription: unknown | null;
  prescriptionType: string;
};

type CalculatedProperties = {
  calculatedQuantity: number | null;
  calculatedDailyDose: number | null;
  errors: string[];
};

type DateProperties<T extends string | Date> = {
  dateLastIssued: T;
  nextIssueDate: T;
};

export type ApiRepeat = CoreRepeat & DateProperties<string>;

export type Repeat = CoreRepeat & CalculatedProperties & DateProperties<Date>;

export type RawRepeat =
  & CoreRepeat
  & CalculatedProperties
  & DateProperties<string>;
