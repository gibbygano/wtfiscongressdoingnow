import { cx } from "twind";
import { JSX } from "preact/jsx-runtime";

type Props = {
	headerText: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	actionChildren?: string | JSX.Element | JSX.Element[] | (() => JSX.Element) | undefined;
	className?: string;
};

export default (
	{
		headerText,
		children,
		actionChildren,
		className,
	}: Props,
) => (
	<div
		tabindex={0}
		class={cx(
			"flex flex-col bg-white border rounded-xl dark:(bg-gray-800,border-gray-700,shadow-slate-700/[.7]n) shadow-xl break-inside-avoid mb-5",
			{ [`${className}`]: className },
		)}
	>
		<div class="p-4 md:p-5">
			<h3 class="text-xl font-bold text-gray-800 dark:text-white">
				{headerText}
			</h3>
			{children}
		</div>
		<div class="py-4 md:py-5 md:px-10 px-5">
			{actionChildren}
		</div>
	</div>
);
