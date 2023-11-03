import { JSX } from "preact/jsx-runtime";
import "humanizer";
import { cx } from "twind";
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

	return (
		<div>
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
			<footer class="fixed w-full bottom-0 z-[1] w-auto bg-slate-100 grid grid-col-3 py-5 gap-2 rounded">
				<a
					id="previousPage"
					onClick={onNextOrPreviousClick}
					title="Previous Page"
					class={cx("cursor-pointer hover:underline ml-5", {
						"collapse": !previousPage,
					})}
					disabled={!previousPage}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="#000000"
						height="25px"
						width="25px"
						version="1.1"
						id="left-arrow"
						viewBox="0 0 330 330"
						xml:space="preserve"
					>
						<path
							id="XMLID_92_"
							d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001  l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996  C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
						/>
					</svg>
				</a>
				<span class="col-start-2 justify-self-center">
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
				</span>
				{nextPage && (
					<a
						id="nextPage"
						title="Next Page"
						onClick={onNextOrPreviousClick}
						class="cursor-pointer hover:underline col-start-3 justify-self-end mx-5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="#000000"
							height="25px"
							width="25px"
							version="1.1"
							id="right-arrow"
							viewBox="0 0 330.002 330.002"
							xml:space="preserve"
						>
							<path
								id="XMLID_103_"
								d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21  l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001  c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
							/>
						</svg>
					</a>
				)}
			</footer>
		</div>
	);
};
