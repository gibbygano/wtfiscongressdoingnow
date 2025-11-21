import { clsx } from "clsx";
import { TbBomb } from "@preact-icons/tb";
import { JSX } from "preact";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  fullscreen?: boolean;
};

export default ({ children, fullscreen }: Props) => (
  <div
    class={clsx(
      "relative flex items-center justify-center",
      {
        "h-screen mt-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3":
          fullscreen,
        "mt-5 rounded alert alert-error": !fullscreen,
      },
    )}
    role="alert"
  >
    <TbBomb class="text-6xl" />
    {children}
  </div>
);
