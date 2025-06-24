import type { ExecutiveOrders } from "types";
import useFetch from "./useFetch.ts";

const useFetchExecutiveOrders = (
	callback: (responseObject: ExecutiveOrders) => void,
	page: string = "1",
	query?: string | null,
) => {
	const searchParams = new URLSearchParams({ "pageSize": "20", "page": page });
	if (query) {
		searchParams.append("query", query);
	}

	return {
		...useFetch(
			`/api/eo?${searchParams}`,
			callback,
		),
	};
};

export default useFetchExecutiveOrders;
