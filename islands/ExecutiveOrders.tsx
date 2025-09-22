import {
	ExecutiveOrdersGrid,
	ExecutiveOrdersSearch,
} from "components/ExecutiveOrders";
import { InfiniteScroll, Status } from "components/shared";
import { useExecutiveOrderContext } from "context";

export default () => {
	const { executiveOrders, loading, error, handleIntersection } =
		useExecutiveOrderContext();

	return (
		<>
			<ExecutiveOrdersSearch />
			<Status loading={loading} error={error} fullscreen>
				<div class="flex-1 flex flex-col">
					{executiveOrders?.results && (
						<InfiniteScroll callback={handleIntersection} enabled={!loading}>
							<ExecutiveOrdersGrid executiveOrders={executiveOrders.results} />
						</InfiniteScroll>
					)}
				</div>
			</Status>
		</>
	);
};
