import { useComputed, useSignal } from "@preact/signals";
import { BillsGrid, Status } from "components";
import { useFetchBills, useIntersectionObserver } from "hooks";
import type { CongressionalBills } from "types";

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
		(congressionalBills) =>
			bills.value = {
				packages: bills.value
					? [...bills.value?.packages, ...congressionalBills.packages]
					: congressionalBills.packages,
				count: bills.value?.count ?? 0 + congressionalBills.count,
				message: congressionalBills.message,
				nextPage: congressionalBills.nextPage,
			},
	);

	const { containerRef, isIntersecting } = useIntersectionObserver();
	if (isIntersecting) {
		if (bills.value?.nextPage) {
			offsetUnsafe.value = new URL(bills.value?.nextPage).searchParams.get("offset");
		}
	}

	return (
		<Status error={error} loading={loading} fullscreen>
			<div class="flex-1 flex flex-col">
				{bills.value && (
					<>
						<BillsGrid {...bills.value} />
						{!loading &&
							(
								<span
									class="h-0 w-0 overflow-hidden opacity-0 mb-1"
									ref={containerRef}
								/>
							)}
					</>
				)}
			</div>
		</Status>
	);
};
