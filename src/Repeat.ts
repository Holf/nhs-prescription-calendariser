export type Repeat = {
  drug: {
    id: string;
    name: string;
    details: string;
    constituents: unknown[];
  };
  dateLastIssued: Date;
  nextIssueDate: Date;
  reviewDate: string | null;
  dateLastIssuedNotKnown: boolean;
  duration: number;
  isPending: boolean;
  quantityRepresentation: string;
  unStructuredDescription: null | unknown;
  prescriptionType: string;
};

export type RawRepeat = Omit<Repeat, "dateLastIssued" | "nextIssueDate"> & {
  dateLastIssued: string;
  nextIssueDate: string;
};
