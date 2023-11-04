import { JSX } from "preact/jsx-runtime";

export const onEvent = (
	event: JSX.TargetedEvent<Element, Event>,
	callback: () => void,
) => {
	event.preventDefault();
	callback();
};
