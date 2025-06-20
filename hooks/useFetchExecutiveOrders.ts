import useFetch from "./useFetch.ts";
import { type ExecutiveOrders } from "types";

const useFetchExecutiveOrders = (
	callback: (responseObject: ExecutiveOrders) => void,
) => {
	return {
		...useFetch(
			`/api/eo?${new URLSearchParams({ "pageSize": "20" })}`,
			callback,
		),
	};
};

export default useFetchExecutiveOrders;
