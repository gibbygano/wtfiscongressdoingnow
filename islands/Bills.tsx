import { BillsSearch, BillsTable } from "components/Bills";
import { InfiniteScroll, Status } from "components/shared";
import { useBillsContext } from "context";

export default () => {
	const {
		bills,
		loading,
		error,
		searchResults,
		isSearching,
		handleIntersection,
	} = useBillsContext();
	const packages = isSearching ? searchResults?.results : bills?.packages;

	return (
		<>
			<BillsSearch />
			<Status error={error} loading={loading} fullscreen>
				<div class="flex-1 flex flex-col">
					{packages && (
						<InfiniteScroll enabled={!loading} callback={handleIntersection}>
							<BillsTable packages={packages} />
						</InfiniteScroll>
					)}
				</div>
			</Status>
		</>
	);
};
