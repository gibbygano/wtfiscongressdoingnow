import { JSX } from "preact/jsx-runtime";
import "humanizer";
import Select from "../components/Select.tsx";
import { useSignal } from "@preact/signals";
import BillsGrid, { CongressionalBill } from "../components/BillsGrid.tsx";
import useFetchBills from "/hooks/useFetchBills.ts";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: string;
	previousPage?: string;
	packages: Array<CongressionalBill>;
}

export default () => {
	const pageSize = useSignal("12");
	const offset = useSignal("0");

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		bills: { count, message, nextPage, previousPage, packages },
		loading,
		error,
	} = useFetchBills(fromDateISO, pageSize.value, offset.value);

	const onSelectChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
		e.preventDefault();
		pageSize.value = e.currentTarget.value;
	};

	const onNextOrPreviousClick = (e: JSX.TargetedMouseEvent<HTMLSpanElement>) => {
		e.preventDefault();

		if (e.currentTarget.id === "nextPage" && nextPage) {
			offset.value = new URL(nextPage).searchParams.get("offset") ?? "0";
		}
		if (e.currentTarget.id === "previousPage" && previousPage) {
			offset.value = new URL(previousPage).searchParams.get("offset") ?? "0";
		}
	};

	const PageSizeSelect = () => {
		return (
			<Select
				inputId="pageSize"
				label="Results per page"
				value={pageSize.value}
				onChange={onSelectChange}
			>
				<option value="12" selected>
					12
				</option>
				<option value="24">
					24
				</option>
				<option value="48">
					48
				</option>
				<option value="96">
					96
				</option>
			</Select>
		);
	};

	return (
		<div>
			<PageSizeSelect />
			<BillsGrid
				error={error}
				loading={loading}
				pageSize={pageSize.value}
				packages={packages}
				onNextOrPreviousClick={onNextOrPreviousClick}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</div>
	);
};
