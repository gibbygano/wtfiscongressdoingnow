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
	<div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]n h-full justify-between shadow-xl">
		<div class="p-4 md:p-5 flex-grow">
			<h3 class="text-lg font-bold text-gray-800 dark:text-white">
				{headerText}
			</h3>
			{children}
		</div>
		<div class="mt-auto p-4 md:p-5">
			{actionChildren}
		</div>
	</div>
);
