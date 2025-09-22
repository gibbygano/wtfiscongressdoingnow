import { JSX } from "preact";

interface collapseProps {
	packageId: string;
	collapseTitle: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const Collapse = ({ packageId, collapseTitle, children }: collapseProps) => {
	return (
		<div tabindex={0} class="collapse bg-base-100 border border-base-300">
			<input type="radio" name={`${packageId}-collapse`} />
			<div class="collapse-title font-semibold">{collapseTitle}</div>
			<div class="collapse-content text-sm">{children}</div>
		</div>
	);
};

export default Collapse;
