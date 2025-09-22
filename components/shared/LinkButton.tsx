import { clsx } from "clsx";
import { HTMLAttributes, JSX } from "preact";

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  target?: string;
  className?: string;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  label: string;
}

export default ({
  href,
  target,
  className,
  children,
  label,
  ...rest
}: Props) => (
  <a
    class={clsx(
      "mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 " +
        "rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all " +
        "text-md dark:focus:ring-offset-gray-800 float-right",
      { [`${className}`]: className },
    )}
    {...rest}
    href={href}
    target={target}
    aria-label={label}
  >
    {children}
  </a>
);
