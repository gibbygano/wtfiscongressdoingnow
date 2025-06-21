import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

const useIntersectionObserver = (
	options: IntersectionObserverInit = { root: null, rootMargin: "0px", threshold: 1.0 },
) => {
	const isIntersecting = useSignal(false);
	const containerRef = useRef(null);

	const callback = (entries: IntersectionObserverEntry[]) => {
		const [entry] = entries;
		isIntersecting.value = entry.isIntersecting;
	};

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

	return { containerRef, isIntersecting: isIntersecting.value };
};

export { useIntersectionObserver };
