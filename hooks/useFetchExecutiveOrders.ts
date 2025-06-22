import type { ExecutiveOrders } from "types";
import useFetch from "./useFetch.ts";

const useFetchExecutiveOrders = (
	callback: (responseObject: ExecutiveOrders) => void,
	page: string = "1",
) => {
	return {
		...useFetch(
			`/api/eo?${new URLSearchParams({ "pageSize": "20", "page": page })}`,
			callback,
		),
	};
};

export default useFetchExecutiveOrders;
