import type { Signal } from "@preact/signals";
import { useComputed, useSignal } from "@preact/signals";
import { useFetchBillsSearchResults } from "hooks";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";
import type { BillsCollectionSearchResults, Filter, Filters } from "types";

interface BillsContextValue {
	searchResults: BillsCollectionSearchResults | null;
	isSearching: boolean;
	clearSearchResults: () => void;
	handleIntersection: (entries: IntersectionObserverEntry[]) => void;
	addFilter: (filterType: string, filter: Filter) => void;
	toggleFilter: (enabled: boolean, filterType: string) => void;
	resultsCount: number;
	querySignal: Signal<string | undefined>;
	filters: Filters;
	loading: boolean;
	error: Error | null;
}

interface BillsContextProviderProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const BillsContext = createContext<BillsContextValue | null>(null);

const BillsContextProvider = ({ children }: BillsContextProviderProps) => {
	const pageSize = useSignal(12);
	const offsetMark = useSignal("*");
	const searchResults = useSignal<BillsCollectionSearchResults | null>(null);
	const query = useSignal<string | undefined>();
	const isSearching = useComputed(() => (query.value?.length ?? 0) > 0);
	const filters = useSignal<Filters>({
		collection: {
			filterValue: "BILLS",
			enabled: true,
			visibleToUi: false,
			label: "",
		},
	});

	const { loading, error } = useFetchBillsSearchResults(
		query.value,
		filters.value,
		offsetMark.value,
		pageSize.value,
		(responseObject) =>
			searchResults.value = {
				results: searchResults.value
					? [...searchResults.value.results, ...responseObject.results]
					: responseObject.results,
				count: responseObject.count,
				offsetMark: responseObject.offsetMark,
			},
	);

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const [entry] = entries;
		if (entry.isIntersecting) {
			if (
				searchResults.value?.offsetMark &&
				searchResults.value.count > pageSize.value
			) {
				offsetMark.value = searchResults.value.offsetMark;
			}
		}
	};

	const clearSearchResults = () => {
		searchResults.value = null;
		offsetMark.value = "*";
	};

	const addFilter = (filterType: string, filter: Filter) => {
		clearSearchResults();
		filters.value[filterType] = filter;
	};

	const toggleFilter = (enabled: boolean, filterType: string) => {
		clearSearchResults();
		filters.value[filterType].enabled = enabled;
	};

	return (
		<BillsContext.Provider
			value={{
				searchResults: searchResults.value,
				querySignal: query,
				filters: filters.value,
				resultsCount: searchResults.value?.count ?? 0,
				addFilter,
				toggleFilter,
				clearSearchResults: clearSearchResults,
				handleIntersection: handleIntersection,
				isSearching: isSearching.value,
				loading,
				error,
			}}
		>
			{children}
		</BillsContext.Provider>
	);
};

const useBillsContext = (): BillsContextValue => {
	const billsContext = useContext(BillsContext);

	if (!billsContext) {
		throw new Error("useBillsContext must be used within a BillsContextProvider");
	}
	return billsContext;
};

export { BillsContextProvider, useBillsContext };
