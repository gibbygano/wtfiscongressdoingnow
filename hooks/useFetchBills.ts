import { Signal } from "@preact/signals";
import { CongressionalBills } from "types";
import useFetch from "./useFetch.ts";

const useFetchBills = (
	bills: Signal<CongressionalBills>,
	startDate: Date,
	pageSize: string,
	offset: string,
) => {
	return {
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
