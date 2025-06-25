import { ExecutiveOrdersGrid, ExecutiveOrdersSearch } from "components/ExecutiveOrders";
import { Status } from "components/shared";
import { useExecutiveOrderContext } from "context";
import { useIntersectionObserver } from "hooks";

export default () => {
	const { executiveOrders, loading, error, handleIntersection } = useExecutiveOrderContext();
	const containerRef = useIntersectionObserver(handleIntersection);

	return (
		<>
			<ExecutiveOrdersSearch />
			<Status loading={loading} error={error} fullscreen>
				<div class="flex-1 flex flex-col">
					{executiveOrders?.results && (
						<ExecutiveOrdersGrid executiveOrders={executiveOrders.results} />
					)}
					{!loading &&
						(
							<span
								class="h-0 w-0 overflow-hidden opacity-0 mb-1"
								ref={containerRef}
							/>
						)}
				</div>
			</Status>
		</>
	);
};
