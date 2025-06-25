import { map } from "es-toolkit/compat";
import type { BillsCollectionSearchResults, Filters } from "types";
import useFetch from "./useFetch.ts";

const useFetchBillsSearchResults = (
	search: string | undefined,
	filters: Filters,
	offsetMark: string,
	pageSize: number,
	callback: (responseObject: BillsCollectionSearchResults) => void,
) => {
	const filterStrings = map(
		filters,
		({ filterValue, enabled }, key) => {
			if (enabled) {
				return `${key}:${filterValue}`;
			}

			return null;
		},
	);
	if (search) {
		filterStrings.push(search);
	}

	return {
		...useFetch(
			`/api/bills/search/${filterStrings.join(" and ")}?${new URLSearchParams({
				"offsetMark": offsetMark,
				"pageSize": pageSize.toString(),
			})}`,
			callback,
		),
	};
};

export { useFetchBillsSearchResults };
