import { useSignal } from "@preact/signals";
import { BillRelatedInformation } from "/islands/RelatedInformation.tsx";
import { useEffect } from "preact/hooks";

const useFetchBillRelatedInformation = (packageId: string) => {
	const loading = useSignal(false);
	const error = useSignal({ isError: false, message: "" });
	const billRelatedInforamtion = useSignal<BillRelatedInformation>({ results: [] });

	const fetchRelatedInfo = async () => {
		loading.value = true;
		try {
			const data = await fetch(`/api/bills/related/${packageId}`);
			console.log(data);
			billRelatedInforamtion.value = await data.json();
		} catch (e) {
			error.value = {
				isError: true,
				message: e.message ?? "There was an issue reaching /api/related",
			};
		} finally {
			loading.value = false;
		}
	};

	useEffect(() => {
		fetchRelatedInfo();
	}, [packageId]);

	return {
		billRelatedInforamtion: billRelatedInforamtion.value,
		loading: loading.value,
		error: error.value,
	};
};

export default useFetchBillRelatedInformation;
