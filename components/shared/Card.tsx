import { cx } from "twind";
import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";
import { onEvent } from "DOMEventHandlers";

type Props = {
	headerText: string;
	children: ComponentChildren;
	onClose: JSX.MouseEventHandler<HTMLButtonElement>;
	actionChildren?: ComponentChildren;
	className?: string;
};

export default (
	{
		headerText,
		children,
		onClose,
		actionChildren,
		className,
	}: Props,
) => (
	<div
		tabindex={0}
		class={cx(
			`flex flex-col bg-white border rounded-xl 
			 dark:(bg-gray-800,border-gray-700,shadow-slate-700/[.7]n) 
			 shadow-xl break-inside-avoid mb-5 group/card`,
			{ [`${className}`]: className },
		)}
	>
		<div class="p-4 md:p-5 flex flex-col">
			<div class="flex w-full justify-between">
				<div class="justify-self-start">
					<h3 class="text-xl font-bold text-gray-800 dark:text-white">
						{headerText}
					</h3>
					{children}
				</div>
				<button
					onClick={onClose}
					type="button"
					class="bg-white dark:(bg-gray-800,border-gray-700,shadow-slate-700/[.7]n) 
			       rounded-md p-2 items-center justify-center hidden
				   group-focus-within/card:inline-flex justify-self-end self-start
			       text-gray-400 hover:text-gray-500 focus:outline-none
				   focus:ring-2 focus:ring-inset focus:ring-indigo-500"
				>
					<span class="sr-only">Close menu</span>
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
		<div class="py-4 px-5
		            md:(py-5,px-10)">
			{actionChildren}
		</div>
	</div>
);
