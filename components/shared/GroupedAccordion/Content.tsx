import { useContext } from "preact/hooks";
import { ComponentChildren, FunctionalComponent } from "preact";
import { cx } from "twind";
import { Context } from "./Group.tsx";

type ContentProps = {
	children: ComponentChildren;
};

const Content = (
	{ children }: ContentProps,
) => {
	const { isLast, isOpen } = useContext(Context);
	return (
		<div
			class={cx(
				`w-full max-h-[50vh] overflow-auto ease-in-out duration-300
                 md:max-h-[25vh]`,
				{
					"sm,md:max-h-0 overflow-hidden": !isOpen,
				},
			)}
		>
			<div
				class={cx(
					"p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900",
					{
						"border-b-0": !isLast,
						"rounded-b-xl": isLast,
					},
				)}
			>
				{children}
			</div>
		</div>
	);
};

export default Content;
