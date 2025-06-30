import { clsx } from "clsx";
import { JSX } from "preact/jsx-runtime";

type Props = {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	fullscreen?: boolean;
};

export default ({ children, fullscreen = false }: Props) => (
	<div
		class={clsx(
			"top-0 left-0 right-0 bottom-0 overflow-hidden opacity-75 flex flex-col items-center justify-center",
			{ "fixed z-30 w-full h-screen bg-gray-700": fullscreen },
		)}
	>
		<div class="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500" />
		<h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
		<span class="sr-only">{children}</span>
	</div>
);
