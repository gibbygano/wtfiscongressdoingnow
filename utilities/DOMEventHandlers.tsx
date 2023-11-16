import { JSX } from "preact/jsx-runtime";

export const onEvent = (
	event: JSX.TargetedEvent<Element, Event>,
	callback: () => void,
) => {
	event.preventDefault();
	callback();
};

self.onkeydown = (e) => {
	if (e.key === "Escape") {
		(document.activeElement as HTMLElement)?.blur();
	}
};
