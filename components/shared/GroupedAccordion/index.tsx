import { ComponentChildren } from "preact";
import Button from "./Button.tsx";
import Content from "./Content.tsx";
import Group from "./Group.tsx";

type Props = {
	children: ComponentChildren;
};

const GroupedAccordion = ({ children }: Props) => {
	return (
		<div>
			{children}
		</div>
	);
};

export {
	Button as GroupedAccordionButton,
	Content as GroupedAccordionContent,
	Group as GroupedAccordionGroup,
	GroupedAccordion,
};
