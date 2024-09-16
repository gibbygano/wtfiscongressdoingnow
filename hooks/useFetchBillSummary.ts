import { Signal } from "@preact/signals";
import useFetch from "./useFetch.ts";
import { CongressionalBillSummary } from "types";

const useFetchBillSummary = (
	packageId: string,
	billSummary: Signal<CongressionalBillSummary>,
	summaryAccordionIsOpen: boolean,
) => {
	if (!summaryAccordionIsOpen) {
		return { loading: false, error: null };
	}

	return {
		...useFetch(
			`/api/bills/summary/${packageId}`,
			undefined,
			billSummary,
		),
	};
};

export default useFetchBillSummary;
