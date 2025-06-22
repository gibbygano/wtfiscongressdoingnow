import { BillsGrid, Status } from "components";

import { Search } from "components";
import { SearchResultsGrid } from "../components/SearchResultsGrid.tsx";
import { useBillsContext } from "context";
import { useIntersectionObserver } from "hooks";

export default () => {
	const { bills, loading, error, searchResults, isSearching, handleIntersection } =
		useBillsContext();
	const { containerRef, isIntersecting } = useIntersectionObserver();
	handleIntersection(isIntersecting);

	const BillsContainer = () => {
		if (isSearching && searchResults) {
			return <SearchResultsGrid packages={searchResults.results} />;
		}

		if (bills) {
			return <BillsGrid packages={bills.packages} />;
		}

		return null;
	};

	return (
		<>
			<Search />
			<Status error={error} loading={loading} fullscreen>
				<div class="flex-1 flex flex-col">
					<BillsContainer />
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
