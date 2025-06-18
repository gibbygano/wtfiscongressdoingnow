import { JSX } from "preact/jsx-runtime";
import { clsx } from "clsx";

type Props = {
	title: string;
	id: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	isOpen: boolean;
	onExpand: JSX.MouseEventHandler<HTMLButtonElement>;
};

export default ({ title, id, children, isOpen, onExpand }: Props) => {
	return (
		<div class="mx-auto dark:text-white mt-10 shadow-lg shadow-gray-700">
			<div class="border border-gray-200 rounded">
				<div>
					<button
						type="button"
						onClick={onExpand}
						class="w-full p-4 text-center text-lg align-text-top inline-block focus:outline-none hover:bg-slate-400"
					>
						{title}{" "}
						<svg
							class="float-right"
							width="25"
							height="25"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill="#E5E7EB"
								d="M10.1025513,12.7783485 L16.8106554,6.0794438 C17.0871744,5.80330401 17.5303978,5.80851813 17.8006227,6.09108986 C18.0708475,6.37366159 18.0657451,6.82658676 17.7892261,7.10272655 L10.5858152,14.2962587 C10.3114043,14.5702933 9.87226896,14.5675493 9.60115804,14.2901058 L2.2046872,6.72087106 C1.93149355,6.44129625 1.93181183,5.98834118 2.20539811,5.7091676 C2.47898439,5.42999401 2.92223711,5.43031926 3.19543076,5.70989407 L10.1025513,12.7783485 Z"
							/>
						</svg>
					</button>
				</div>
				<div
					id={id}
					class={clsx(
						"ease-out duration-300 w-full",
						{
							"border-t border-gray-200 max-h-[65vh] overflow-auto p-4": isOpen,
							"overflow-hidden max-h-0": !isOpen,
						},
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
};
