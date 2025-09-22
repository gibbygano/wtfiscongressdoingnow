import clsx from "clsx";
import { HTMLAttributes } from "preact";

const Badge = ({ children, className }: HTMLAttributes<HTMLSpanElement>) => (
	<span
		class={clsx("text-xs font-medium mr-2 px-2.5 py-0.5 rounded", [className])}
	>
		{children}
	</span>
);

export { Badge };
