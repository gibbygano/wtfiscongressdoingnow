import CongressionalBill from "./CongressionalBill.ts";

interface BillsCollectionSearchResults {
	offsetMark: string;
	count: number;
	results: Array<CongressionalBill>;
}

export type { BillsCollectionSearchResults };
