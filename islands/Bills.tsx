import { BillsGrid, Status } from "components";
import { useIntersectionObserver } from "hooks";
import { useBillsContext } from "context";

export default () => {
	const { bills, offsetUnsafeSignal, loading, error } = useBillsContext();
	const { containerRef, isIntersecting } = useIntersectionObserver();
	if (isIntersecting) {
		if (bills?.nextPage) {
			offsetUnsafeSignal.value = new URL(bills?.nextPage).searchParams.get("offset");
		}
	}

	return (
		<Status error={error} loading={loading} fullscreen>
			<div class="flex-1 flex flex-col">
				{bills && (
					<>
						<BillsGrid {...bills} />
						{!loading &&
							(
								<span
									class="h-0 w-0 overflow-hidden opacity-0 mb-1"
									ref={containerRef}
								/>
							)}
					</>
				)}
			</div>
		</Status>
	);
};
