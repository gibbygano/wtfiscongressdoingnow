import { useComputed, useSignal } from "@preact/signals";
import { useEffect } from "preact/compat";
import { BillsGrid, Status } from "components";
import { BillsNav } from "islands";
import { useFetchBills } from "hooks";
import { CongressionalBills, CongressionalBillsDefault } from "types";

export default () => {
	useEffect(() => {
		navigator
			.serviceWorker
			.getRegistration()
			.then((serviceWorker) => {
				if (serviceWorker) {
					serviceWorker.unregister();
				}
			})
			.catch((error) => {
				console.error("There was an error: ", error);
			});
	}, []);

	const bills = useSignal<CongressionalBills>(CongressionalBillsDefault);
	const pageSize = useSignal("12");
	const offsetUnsafe = useSignal<string | null>("0");
	const offsetSafe = useComputed(() => offsetUnsafe.value ?? "0");

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		loading,
		error,
	} = useFetchBills(bills, fromDateISO, pageSize.value, offsetSafe.value);

	return (
		<Status error={error} loading={loading} fullscreen>
			<div class="flex-1 flex flex-col">
				<BillsGrid {...bills.value} />
				<BillsNav
					offsetUnsafe={offsetUnsafe}
					pageSize={pageSize}
					nextPage={bills.value.nextPage}
					previousPage={bills.value.previousPage}
				/>
			</div>
		</Status>
	);
};
