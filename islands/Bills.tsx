import { useComputed, useSignal } from "@preact/signals";
import { BillsGrid, Status } from "components";
import { BillsNav } from "islands";
import { useFetchBills } from "hooks";
import { type CongressionalBills, CongressionalBillsDefault } from "types";

interface BillsProps {
	bills: CongressionalBills;
	pageSize: string;
	pageOffset: string;
	isLoading: boolean;
	error: Error;
}

export default ({bills, pageSize, pageOffset, isLoading, error}: BillsProps) => {
	return (
		<Status error={error} loading={isLoading} fullscreen>
			<div class="flex-1 flex flex-col">
				<BillsGrid {...bills} />
				<BillsNav
					offsetUnsafe={pageOffset}
					pageSize={pageSize}
					nextPage={bills.nextPage}
					previousPage={bills.previousPage}
				/>
			</div>
		</Status>
	);
};
