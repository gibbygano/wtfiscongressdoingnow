import { useSignal } from "@preact/signals";
import { CongressionalBills } from "../islands/Bills.tsx";
import useFetch from "/hooks/useFetch.ts";

const useFetchBills = (startDate: string) => {
	const bills = useSignal<CongressionalBills>({
		count: 0,
		message: "",
		nextPage: undefined,
		previousPage: undefined,
		packages: [],
	});

	return {
		bills: bills.value,
		...useFetch(`/api/bills/${startDate}`, undefined, undefined, bills),
	};
};

export default useFetchBills;
