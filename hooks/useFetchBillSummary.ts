import { Signal } from "@preact/signals";
import useFetch from "./useFetch.ts";
import { CongressionalBillSummary } from "types";

const useFetchBillSummary = (
	packageId: string,
	billSummary: Signal<CongressionalBillSummary | undefined>,
	summaryAccordionIsOpen: boolean,
) => {
	return {
		...useFetch(
			`/api/bills/summary/${packageId}`,
			undefined,
			billSummary,
			summaryAccordionIsOpen,
		),
	};
};

export default useFetchBillSummary;
