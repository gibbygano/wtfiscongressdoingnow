import { useComputed, useSignal } from "@preact/signals";
import { BillsGrid, Status } from "components";
import { BillsNav } from "islands";
import { useFetchBills } from "hooks";
import { type CongressionalBills } from "types";

export default () => {
	const bills = useSignal<CongressionalBills>();
	const pageSize = useSignal("12");
	const offsetUnsafe = useSignal<string | null>("0");
	const offsetSafe = useComputed(() => offsetUnsafe.value ?? "0");

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		loading,
		error,
	} = useFetchBills(
		fromDateISO,
		pageSize.value,
		offsetSafe.value,
		(congressionalBills) => bills.value = congressionalBills,
	);

	return (
		<Status error={error} loading={loading} fullscreen>
			<div class="flex-1 flex flex-col">
				{bills.value && (
					<>
						<BillsGrid {...bills.value} />
						<BillsNav
							offsetUnsafe={offsetUnsafe}
							pageSize={pageSize}
							nextPage={bills.value.nextPage}
							previousPage={bills.value.previousPage}
						/>
					</>
				)}
			</div>
		</Status>
	);
};
