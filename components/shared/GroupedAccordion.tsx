import { Signal } from "@preact/signals";
import { cx } from "twind";
import { JSX } from "preact/jsx-runtime";

type Props = {
	sections: Array<{
		title: string;
		contents: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
		icon: JSX.Element;
		sectionId: string;
		onExpand: JSX.MouseEventHandler<HTMLButtonElement>;
	}>;
	openSectionId: Signal<string | null>;
};

export default ({ sections, openSectionId }: Props) => {
	return (
		<div>
			{sections.map(({ contents, onExpand, title, sectionId, icon }, i) => {
				const lastSectionIndex = sections.length - 1;
				const isOpen = sectionId === openSectionId.value;

				return (
					<>
						<h2>
							<button
								onClick={onExpand}
								type="button"
								class={cx(
									`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border 
                                            border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 
                                            dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`,
									{
										"rounded-t-xl": i === 0,
										"border-b-0": i !== lastSectionIndex,
										"rounded-b-xl": i === lastSectionIndex &&
											openSectionId.value !== sectionId,
									},
								)}
							>
								<span class="flex items-center">
									{icon}&nbsp;{title}
								</span>
								<svg
									class={cx("w-3 h-3 shrink-0", {
										"rotate-180": openSectionId.value === sectionId,
									})}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							class={cx("w-full md:max-h-[40vh] max-h-[50vh] overflow-auto", {
								"hidden": !isOpen,
							})}
						>
							<div
								class={cx(
									"p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900",
									{
										"border-b-0": i !== lastSectionIndex,
										"rounded-b-xl": i === lastSectionIndex,
									},
								)}
							>
								{contents}
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
};
