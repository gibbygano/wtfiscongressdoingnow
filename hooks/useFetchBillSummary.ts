import { Signal } from "@preact/signals";
import useFetch from "./useFetch.ts";
import { CongressionalBillSummary } from "types";

const useFetchBillSummary = (
	packageId: string,
	billSummary: Signal<CongressionalBillSummary>,
	summaryAccordionIsOpen: boolean,
) => {
	const emptyReturn = { loading: false, error: null };

	const result = useFetch(
		`/api/bills/summary/${packageId}`,
		undefined,
		billSummary,
		!summaryAccordionIsOpen,
	);

	return !summaryAccordionIsOpen ? emptyReturn : { ...result };
};

export default useFetchBillSummary;
