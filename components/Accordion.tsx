import { JSX } from "preact/jsx-runtime";

export default ({ title, id, children, onSummaryExpand }: {
	title: string | undefined;
	id: string | undefined;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element) | undefined;
	onSummaryExpand: JSX.MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<div class="max-w-md mx-auto dark:text-white mt-10">
			<div class="border border-gray-200 rounded">
				<div class="border-b border-gray-200">
					<button
						onClick={onSummaryExpand}
						class="w-full p-4 text-left focus:outline-none hover:bg-gray-100"
					>
						{title}
					</button>
				</div>
				<div
					id={id}
					class="ease-out duration-300 overflow-hidden max-h-0 overflow-auto"
				>
					{children}
				</div>
			</div>
		</div>
	);
};
