import { BillsGrid, BillsSearch } from "components/Bills";
import { Status } from "components/shared";
import { useBillsContext } from "context";
import { useIntersectionObserver } from "hooks";

export default () => {
	const { loading, error, searchResults, handleIntersection } = useBillsContext();
	const containerRef = useIntersectionObserver(handleIntersection);

	return (
		<>
			<BillsSearch />
			<Status error={error} loading={loading} fullscreen>
				<div class="flex-1 flex flex-col">
					{searchResults?.results && <BillsGrid packages={searchResults.results} />}
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
