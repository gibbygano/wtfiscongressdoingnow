import type { BillsCollectionSearchResults } from "types";
import useFetch from "./useFetch.ts";

const useFetchSearchResults = (
	search: string | null,
	offsetMark: string,
	pageSize: string,
	callback: (responseObject: BillsCollectionSearchResults) => void,
	enable: boolean,
) => {
	return {
		...useFetch(
			`/api/bills/search/collection:(BILLS) and ${search}?${new URLSearchParams({
				"offsetMark": offsetMark,
				"pageSize": pageSize,
			})}`,
			callback,
			enable,
		),
	};
};

export { useFetchSearchResults };
