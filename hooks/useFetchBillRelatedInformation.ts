import { Signal, useSignal } from "@preact/signals";
import { BillRelatedInformation } from "/islands/RelatedInformation.tsx";
import { useEffect } from "preact/hooks";

const useFetchBillRelatedInformation = (packageId: string, anchorEl: Signal<HTMLButtonElement | null>) => {
	const loading = useSignal(false);
	const error = useSignal({ isError: false, message: "" });
	const billRelatedInforamtion = useSignal<BillRelatedInformation>({ results: [] });

	if (!anchorEl.value) return { billRelatedInforamtion: { results: [] } };

	const fetchRelatedInfo = async () => {
		loading.value = true;
		try {
			const data = await fetch(`/api/bills/related/${packageId}`);
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
	}, [packageId, anchorEl]);

	return {
		billRelatedInforamtion: billRelatedInforamtion.value,
		loading: loading.value,
		error: error.value,
	};
};

export default useFetchBillRelatedInformation;
