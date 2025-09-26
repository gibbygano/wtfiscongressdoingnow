import { FunctionComponent } from "preact";
import { collapseProps } from "./propTypes.types.ts";

const Collapse: FunctionComponent<collapseProps> = ({
  joinName,
  collapseTitle,
  children,
  ...rest
}: collapseProps) => {
  return (
    <div
      {...rest}
      class="collapse collapse-arrow join-item bg-base-100 border border-base-300"
    >
      <input type="radio" name={joinName} />
      <div class="collapse-title">{collapseTitle}</div>
      <div class="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
