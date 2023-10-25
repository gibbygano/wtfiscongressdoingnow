import { useSignal } from "@preact/signals";
import { CongressionalBills } from "../islands/Bills.tsx";
import { useEffect } from "preact/hooks";

const useFetchBills = (startDate: string) => {
	const loading = useSignal(false);
	const bills = useSignal<CongressionalBills>({
		count: 0,
		message: "",
		nextPage: undefined,
		previousPage: undefined,
		packages: [],
	});

	const fetchBills = async () => {
		loading.value = true;
		const data = await (await fetch(
			`/api/bills/${startDate}`,
		))
			.json();

		bills.value = data;
		loading.value = false;
	};
	useEffect(() => {
		fetchBills();
	}, [startDate]);

	return {
		bills: bills.value,
		loading: loading.value,
	};
};

export default useFetchBills;
