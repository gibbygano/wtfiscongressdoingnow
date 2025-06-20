import { JSX } from "preact/jsx-runtime";
import { clsx } from "clsx";

type Props = {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	className: string | undefined;
	fullscreen?: boolean;
};

export default ({ children, className, fullscreen }: Props) => (
	<div
		class={clsx(
			"mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center",
			{ "h-screen": fullscreen, [className!]: className },
		)}
		role="alert"
	>
		{children}
	</div>
);
