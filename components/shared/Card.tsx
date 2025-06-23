import { JSX } from "preact/jsx-runtime";

type Props = {
	headerText: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	actionChildren?: string | JSX.Element | JSX.Element[] | (() => JSX.Element) | undefined;
};

export default (
	{
		headerText,
		children,
		actionChildren,
	}: Props,
) => (
	<div class="flex flex-col bg-white border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]n shadow-xl break-inside-avoid mb-5 bottom-0">
		<div class="p-4 md:p-5 prose leading-6">
			<h3 class="text-lg font-semibold text-gray-800 dark:text-white">
				{headerText}
			</h3>
			{children}
		</div>
		<div class="py-4 md:py-5 md:px-10 px-5">
			{actionChildren}
		</div>
	</div>
);
