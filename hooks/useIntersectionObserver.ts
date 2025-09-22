import { useEffect, useRef } from "preact/hooks";

const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  },
) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return containerRef;
};

export { useIntersectionObserver };
