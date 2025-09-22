import clsx from "clsx";
import { useIntersectionObserver } from "hooks";
import { JSX } from "preact";

interface ObservedProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  callback: (entries: IntersectionObserverEntry[]) => void;
  enabled?: boolean;
}

const InfiniteScroll = ({
  children,
  callback,
  enabled = true,
}: ObservedProps) => {
  const containerRef = useIntersectionObserver(callback);

  return (
    <>
      {children}
      <span
        class={clsx("h-0 w-0 overflow-hidden opacity-0 mb-44", {
          hidden: !enabled,
        })}
        ref={containerRef}
      />
    </>
  );
};

export { InfiniteScroll };
