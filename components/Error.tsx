import { JSX } from "preact/jsx-runtime";

type Props = {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

export default ({ children }: Props) => (
	<div
		class="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
		role="alert"
	>
		{children}
	</div>
);
