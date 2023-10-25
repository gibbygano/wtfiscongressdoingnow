import { useSignal } from "@preact/signals";
import { CongressionalBills } from "../islands/Bills.tsx";
import { useEffect } from "preact/hooks";

const useFetchBills = (startDate: string) => {
	const loading = useSignal(false);
	const error = useSignal({ isError: false, message: "" });
	const bills = useSignal<CongressionalBills>({
		count: 0,
		message: "",
		nextPage: undefined,
		previousPage: undefined,
		packages: [],
	});

	const fetchBills = async () => {
		loading.value = true;
		try {
			bills.value = await (await fetch(`/api/bills/${startDate}`)).json();
		} catch (e) {
			error.value = {
				isError: true,
				message: e.message ?? "There was an issue reaching /api/bills",
			};
		} finally {
			loading.value = false;
		}
	};

	useEffect(() => {
		fetchBills();
	}, [startDate]);

	return {
		bills: bills.value,
		loading: loading.value,
		error: error.value,
	};
};

export default useFetchBills;
