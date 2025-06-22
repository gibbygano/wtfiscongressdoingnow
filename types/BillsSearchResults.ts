import type { CongressionalBillSearchResult } from "./CongressionalBillSearchResults.ts";

interface BillsCollectionSearchResults {
	offsetMark: string;
	count: number;
	results: Array<CongressionalBillSearchResult>;
}

export type { BillsCollectionSearchResults };
