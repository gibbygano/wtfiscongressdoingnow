import { JSX } from "preact/jsx-runtime";
import "humanizer";
import { Bill, BillsGrid, Error, Loading, Select } from "components";
import { useSignal } from "@preact/signals";
import useFetchBills from "/hooks/useFetchBills.ts";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: string;
	previousPage?: string;
	packages: Array<Bill>;
}

const pageSizes = [12, 24, 48, 96];

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

	const PageSizeSelect = () => (
		<header class="w-full sticky top-0 z-[1] bg-slate-100 px-5 rounded">
			<Select
				inputId="pageSize"
				label="Results per page"
				value={pageSize.value}
				onChange={onSelectChange}
			>
				{pageSizes.map((s) => (
					<option value={s}>
						{s}
					</option>
				))}
			</Select>
		</header>
	);

	return (
		<div>
			<PageSizeSelect />
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
			<footer class="sticky bottom-0 z-[1] w-auto bg-slate-100 grid grid-col-3 py-5 rounded">
				{previousPage && (
					<a
						id="previousPage"
						onClick={onNextOrPreviousClick}
						class="cursor-pointer hover:underline mx-5"
					>
						← Previous Page
					</a>
				)}
				{nextPage && (
					<a
						id="nextPage"
						onClick={onNextOrPreviousClick}
						class="cursor-pointer hover:underline col-start-3 justify-self-end mx-5"
					>
						Next Page →
					</a>
				)}
			</footer>
		</div>
	);
};
