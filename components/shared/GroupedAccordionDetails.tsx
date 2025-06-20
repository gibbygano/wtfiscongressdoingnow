import { JSX } from "preact/compat";

interface DetailsProps {
	sectionId: string;
	packageId: string;
	title: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	icon: JSX.Element;
}

const GroupedAccordionDetails = (
	{ sectionId, packageId, icon, title, children }: DetailsProps,
) => {
	return (
		<details 
			class="group"
			key={sectionId}
			name={`${packageId}-sections`}
		>
			<summary class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border 
                                                border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 cursor-pointer
                                                dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                                                group-open:border-b-0 group-[&:not(:last-child)]:border-b-0">
				<span class="flex items-center">
					{icon}&nbsp;{title}
				</span>
				<svg
					class={`w-3 h-3 shrink-0 group-open:rotate-180 transform transition-all duration-200`}
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
			<div class="content w-full md:max-h-[40vh] max-h-[50vh] overflow-auto">
				<div class="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 group-[&:not(:last-child)]:border-b-0">
					{children}
				</div>
			</div>
		</details>
	);
};

export { GroupedAccordionDetails };
