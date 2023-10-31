import { JSX } from "preact/jsx-runtime";
import { cx } from "twind";

type Props = {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	fullscreen?: boolean;
};

export default ({ children, fullscreen }: Props) => (
	<div
		class={cx(
			"mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center",
			{ "h-screen": fullscreen },
		)}
		role="alert"
	>
		{children}
	</div>
);
