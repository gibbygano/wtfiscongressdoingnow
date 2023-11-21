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

	const { data, error, loading, status, statusText } = useFetch<CongressionalBills>(
		`/api/bills/${startDate}?${new URLSearchParams({
			"pageSize": pageSize,
			"offset": offset,
		})}`,
		undefined,
	);

	if (data) {
		bills.value.packages = data.packages.reduce(
			(billPkgs, billPkg) => billPkgs.includes(billPkg) ? billPkgs : [...billPkgs, billPkg],
			bills.value.packages,
		);
		bills.value.count = data.count;
		bills.value.nextPage = data.nextPage;
		bills.value.message = data.message;
		bills.value.previousPage = data.previousPage;
	}

	return { bills: bills.value, error, loading };
};

export default useFetchBills;
