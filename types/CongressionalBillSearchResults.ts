interface CongressionalBillSearchResult {
  dateIngested: Date;
  dateIssued: Date;
  lastModified: Date;
  packageId: string;
  title: string;
  docClass: string;
  congress: number;
}

export type { CongressionalBillSearchResult };
