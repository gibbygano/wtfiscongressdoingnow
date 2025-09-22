import type CongressionalBill from "./CongressionalBill.ts";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: string;
	previousPage?: string;
	packages: Array<CongressionalBill>;
}

export const defaultProps: CongressionalBills = {
	count: 0,
	message: "",
	nextPage: undefined,
	previousPage: undefined,
	packages: [],
};
