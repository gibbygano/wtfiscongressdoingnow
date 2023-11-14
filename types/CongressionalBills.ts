import CongressionalBill from "./CongressionalBill.ts";

export default interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: string;
	previousPage?: string;
	packages: Array<CongressionalBill>;
}
