import { JSX } from "preact/jsx-runtime";

const onEvent = (
	event: JSX.TargetedEvent<Element, Event>,
	callback: () => void,
) => {
	event.preventDefault();
	callback();
};

export { onEvent };
