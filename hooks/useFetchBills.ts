import { useSignal } from "@preact/signals";
import { CongressionalBills } from "types";
import useFetch from "./useFetch.ts";

const useFetchBills = (startDate: string, pageSize: string, offset: string) => {
	const bills = useSignal<CongressionalBills>({
		count: 0,
		message: "",
		nextPage: undefined,
		previousPage: undefined,
		packages: [],
	});

	return {
		bills: bills.value,
		...useFetch(
			`/api/bills/${startDate}?${new URLSearchParams({
				"pageSize": pageSize,
				"offset": offset,
			})}`,
			undefined,
			bills,
		),
	};
};

export default useFetchBills;
