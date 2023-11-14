import { computed, useSignal } from "@preact/signals";
import "humanizer";
import { BillsGrid, Error, Loading } from "components";
import { BillsNav } from "islands";
import { useFetchBills, useRegisterServiceWorker } from "hooks";

export default () => {
	useRegisterServiceWorker();

	const pageSize = useSignal("12");
	const offsetUnsafe = useSignal<string | null>("0");
	const offsetSafe = computed(() => offsetUnsafe.value ?? "0");

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		bills,
		loading,
		error,
	} = useFetchBills(fromDateISO, pageSize.value, offsetSafe.value);

	return (
		<div class="flex-1 flex flex-col">
			{error.name
				? <Error fullscreen>{error.name}</Error>
				: loading
				? <Loading fullscreen>Loading Bills...</Loading>
				: (
					<BillsGrid
						{...bills}
					/>
				)}
			<BillsNav
				offsetUnsafe={offsetUnsafe}
				pageSize={pageSize}
				nextPage={bills.nextPage}
				previousPage={bills.previousPage}
			/>
		</div>
	);
};
