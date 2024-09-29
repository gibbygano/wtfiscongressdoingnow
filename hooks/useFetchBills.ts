import { Signal } from "@preact/signals";
import { CongressionalBill, CongressionalBills } from "types";
import useFetch from "./useFetch.ts";

const useFetchBills = (
	bills: Signal<CongressionalBills>,
	startDate: string,
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
			reduce,
		),
	};
};

const reduce = (result: CongressionalBills, current: CongressionalBills) => {
	const reducedPackages = result.packages.reduce(
		(acc: Array<CongressionalBill>, resultItem: CongressionalBill) => {
			if (!acc.some((currentItem) => currentItem.packageId === resultItem.packageId)) {
				acc.push(resultItem);
			}
			return acc;
		},
		current.packages,
	);

	const bills: CongressionalBills = {
		previousPage: result.previousPage,
		nextPage: result.nextPage,
		packages: reducedPackages,
		count: result.count + current.count,
		message: result.message,
	};

	return bills;
};

export default useFetchBills;
