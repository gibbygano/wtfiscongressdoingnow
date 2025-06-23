import { BillsGrid, Status } from "components";

import { BillsSearch } from "components";
import { useBillsContext } from "context";
import { useIntersectionObserver } from "hooks";

export default () => {
	const { bills, loading, error, searchResults, isSearching, handleIntersection } =
		useBillsContext();
	const { containerRef, isIntersecting } = useIntersectionObserver();
	handleIntersection(isIntersecting);

	const packages = isSearching ? searchResults?.results : bills?.packages;

	return (
		<>
			<BillsSearch />
			<Status error={error} loading={loading} fullscreen>
				<div class="flex-1 flex flex-col">
					{packages && <BillsGrid packages={packages} />}
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
