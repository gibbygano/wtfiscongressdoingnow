import { JSX } from "preact/jsx-runtime";

export const onEvent = (
	event: JSX.TargetedEvent<Element, Event>,
	callback: () => void,
	stopPropagation?: boolean,
) => {
	if (stopPropagation) {
		event.stopPropagation();
	}
	event.preventDefault();
	callback();
};

self.onkeydown = (e) => {
	if (e.key === "Escape") {
		(document.activeElement as HTMLElement)?.blur();
	}
};

export const scrollListener = (callback: () => void, remove = false) => {
	if (remove) {
		self.removeEventListener("scroll", callback);
	} else {
		self.addEventListener("scroll", callback);
	}
};
