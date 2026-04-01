import { accordionProps } from "./propTypes.types.ts";

const Accordion = ({ children, ...rest }: accordionProps) => {
  return (
    <div
      {...rest}
      class="join join-vertical dark:text-white shadow-lg shadow-gray-700"
    >
      {children}
    </div>
  );
};

export default Accordion;
