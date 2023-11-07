import "humanizer";
import { Bill, BillsGrid, Error, Loading } from "components";
import { computed, useSignal } from "@preact/signals";
import useFetchBills from "/hooks/useFetchBills.ts";
import useRegisterServiceWorker from "/hooks/useRegisterServiceWorker.ts";
import BillsNav from "/islands/BillsNav.tsx";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: string;
	previousPage?: string;
	packages: Array<Bill>;
}

export default () => {
	useRegisterServiceWorker();

	const pageSize = useSignal("12");
	const offsetUnsafe = useSignal<string | null>("0");
	const offsetSafe = computed(() => offsetUnsafe.value ?? "0");

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		bills: { count, message, nextPage, previousPage, packages },
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
						error={error}
						loading={loading}
						pageSize={pageSize.value}
						packages={packages}
						previousPage={previousPage}
						nextPage={nextPage}
					/>
				)}
			<BillsNav
				offsetUnsafe={offsetUnsafe}
				pageSize={pageSize}
				nextPage={nextPage}
				previousPage={previousPage}
			/>
		</div>
	);
};
