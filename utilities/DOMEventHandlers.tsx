import { TargetedEvent } from "preact";

const onEvent = (
  event: TargetedEvent<Element, Event>,
  callback: () => void,
) => {
  event.preventDefault();
  callback();
};

export { onEvent };
