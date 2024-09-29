import { useComputed, useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/compat";
import "humanizer";
import { BillsGrid, Status } from "components";
import { BillsNav } from "islands";
import { useFetchBills, useRegisterServiceWorker } from "hooks";
import { CongressionalBills, CongressionalBillsDefault } from "types";

export default () => {
	useRegisterServiceWorker();

	const billsRef = useRef<HTMLDivElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const ioRef = useRef<IntersectionObserver>();
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

	useEffect(() => {
		ioRef.current = new IntersectionObserver((entries, observer) => {
			console.log(entries, observer);

			if (bills.value.nextPage) {
				offsetUnsafe.value = new URL(bills.value.nextPage).searchParams
					.get("offset");
			}
		}, {
			root: null,
			rootMargin: "0px",
			threshold: .01,
		});

		if (spanRef.current) {
			ioRef.current.observe(spanRef.current);
		}
	}, []);

	return (
		<Status error={error} loading={loading} fullscreen>
			<div ref={billsRef} class="flex-1 flex flex-col">
				<BillsGrid {...bills.value} />
				<span ref={spanRef} class="h-full" />
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
