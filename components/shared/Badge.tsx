import clsx from "clsx";
import { JSX } from "preact";

const Badge = ({ children, className }: JSX.HTMLAttributes<HTMLSpanElement>) => (
	<span class={clsx("text-xs font-medium mr-2 px-2.5 py-0.5 rounded", [className])}>
		{children}
	</span>
);

export { Badge };
