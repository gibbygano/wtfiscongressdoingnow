import { Signal } from "@preact/signals";
import useFetch from "./useFetch.ts";
import { type ExecutiveOrders } from "types";

const useFetchExecutiveOrders = (
	executiveOrders: Signal<ExecutiveOrders>,
) => {
	return {
		...useFetch(
			`/api/eo?${new URLSearchParams({ "pageSize": "20" })}`,
			undefined,
			executiveOrders,
		),
	};
};

export default useFetchExecutiveOrders;
