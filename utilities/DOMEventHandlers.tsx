import { JSX } from "preact/jsx-runtime";
import { debounce_leading } from "helpers";

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

export const scrollListener = (callback: () => void, remove = false) => {
	if (remove) {
		self.removeEventListener("scroll", debounce_leading(callback));
	} else {
		self.addEventListener("scroll", debounce_leading(callback));
	}
};

export const keyListener = (callback: (e: KeyboardEvent) => void, remove = false) => {
	if (remove) {
		self.removeEventListener("keydown", callback);
	} else {
		self.addEventListener("keydown", callback);
	}
};
