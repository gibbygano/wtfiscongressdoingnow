import { SearchWithFilter } from "components/shared";
import { useBillsContext } from "context";
import { JSX } from "preact";

const BillsSearch = () => {
	const {
		querySignal,
		clearSearchResults,
		toggleFilter,
		isSearching,
		resultsCount,
		loading,
		filters,
	} = useBillsContext();

	const handleSearch = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const currentQueryLength = target.value?.length ?? 0;
		const newValue = target?.value.trim() ?? null;
		if (
			(currentQueryLength >= 3 ||
				currentQueryLength === 0) && newValue != querySignal.value
		) {
			clearSearchResults();
			querySignal.value = newValue;
		}
	};

	const label = isSearching
		? `Results: ${loading ? "" : resultsCount}`
		: "Search Congressional Bills";

	return (
		<SearchWithFilter
			toggleFilter={toggleFilter}
			filters={filters}
			label={label}
			isLoading={loading && isSearching}
			id="bills-search"
			callback={handleSearch}
		/>
	);
};

export { BillsSearch };

