import { cx } from "twind";
import { JSX } from "preact/jsx-runtime";
import { ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import { Context as AccordionGroupContext } from "./Group.tsx";

type ButtonProps = {
	onClick: JSX.MouseEventHandler<HTMLButtonElement>;
	children: ComponentChildren;
};

const Button = (
	{ onClick, children }: ButtonProps,
) => {
	const { isOpen, isLast, isFirst } = useContext(AccordionGroupContext);
	return (
		<h2>
			<button
				onClick={onClick}
				type="button"
				class={cx(
					`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border 
                border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 
                dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`,
					{
						"rounded-t-xl": isFirst,
						"border-b-0": !isLast,
						"rounded-b-xl": isLast && !isOpen,
					},
				)}
			>
				<span class="flex items-center">
					{children}
				</span>
				<svg
					class={cx("w-3 h-3 shrink-0", {
						"rotate-180": isOpen,
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
			</button>
		</h2>
	);
};

export default Button;
