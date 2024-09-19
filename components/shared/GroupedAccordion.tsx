import { Signal } from "@preact/signals";
import { useRef } from "preact/compat";
import { clsx } from "clsx";
import { JSX } from "preact/jsx-runtime";

type Props = {
	sections: Array<{
		title: string;
		contents: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
		icon: JSX.Element;
		sectionId: string;
	}>;
	packageId: string;
	openSection: Signal<HTMLDetailsElement | null>;
};

export default ({ sections, packageId, openSection }: Props) => {
	return (
		<div>
			{sections.map(({ contents, title, sectionId, icon }, i) => {
				const lastSectionIndex = sections.length - 1;
				const detailsAccordion = useRef<HTMLDetailsElement>(null);
				const ontoggle = () => {
					if (detailsAccordion.current?.hasAttribute("open")) {
						return openSection.value = detailsAccordion.current;
					}

					if (openSection.value === detailsAccordion.current) {
						openSection.value = null;
					}
				};

				return (
					<details
						ref={detailsAccordion}
						onToggle={ontoggle}
						id={sectionId}
						key={sectionId}
						name={`${packageId}-sections`}
					>
						<summary
							class={clsx(
								`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border 
                                            border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 cursor-pointer
                                            dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`,
								{
									"rounded-t-xl": i === 0,
									"border-b-0": i !== lastSectionIndex,
									"rounded-b-xl": i === lastSectionIndex &&
										!detailsAccordion.current?.hasAttribute("open"),
								},
							)}
						>
							<span class="flex items-center">
								{icon}&nbsp;{title}
							</span>
							<svg
								class={clsx("w-3 h-3 shrink-0", {
									"rotate-180": detailsAccordion.current?.hasAttribute(
										"open",
									),
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
						</summary>
						<div class="w-full md:max-h-[40vh] max-h-[50vh] overflow-auto">
							<div
								class={clsx(
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
					</details>
				);
			})}
		</div>
	);
};
