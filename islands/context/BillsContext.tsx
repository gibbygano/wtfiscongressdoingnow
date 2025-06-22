import type { BillsCollectionSearchResults, CongressionalBills } from "types";
import { JSX, createContext } from "preact";
import { useComputed, useSignal } from "@preact/signals";
import { useFetchBills, useFetchSearchResults } from "hooks";

import type { Signal } from "@preact/signals";
import { useContext } from "preact/hooks";

interface BillsContextValue {
	bills: CongressionalBills | null;
	searchResults: BillsCollectionSearchResults | null;
	isSearching: boolean;
	clearSearchResults: () => void;
	handleIntersection: (isIntersecting: boolean) => void;
	resultsCount: number;
	querySignal: Signal<string | null>;
	loading: boolean;
	error: Error | undefined;
}

interface BillsContextProviderProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const BillsContext = createContext<BillsContextValue | null>(null);

const BillsContextProvider = ({ children }: BillsContextProviderProps) => {
	const bills = useSignal<CongressionalBills | null>(null);
	const pageSize = useSignal("12");
	const offsetUnsafe = useSignal<string | null>("0");
	const offsetSafe = useComputed(() => offsetUnsafe.value ?? "0");

	const searchResults = useSignal<BillsCollectionSearchResults | null>(null);
	const query = useSignal<string | null>(null);
	const offsetMark = useSignal("*");
	const isSearching = useComputed(() => (query.value?.length ?? 0) > 0);

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		loading,
		error,
	} = useFetchBills(
		fromDateISO,
		pageSize.value,
		offsetSafe.value,
		(congressionalBills) =>
			bills.value = {
				packages: bills.value
					? [...bills.value?.packages, ...congressionalBills.packages]
					: congressionalBills.packages,
				count: bills.value?.count ?? 0 + congressionalBills.count,
				message: congressionalBills.message,
				nextPage: congressionalBills.nextPage,
			},
	);

	const { loading: searchResultsLoading, error: searchError } = useFetchSearchResults(
		query.value,
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
		isSearching.value,
	);

	const handleIntersection = (isIntersecting: boolean) => {
		if (isIntersecting) {
			if (isSearching.value && searchResults.value?.offsetMark) {
				offsetMark.value = searchResults.value.offsetMark;
			}
			if (!isSearching.value && bills.value?.nextPage) {
				offsetUnsafe.value = new URL(bills.value.nextPage).searchParams.get("offset");
			}
		}
	};

	const clearSearchResults = () => {
		searchResults.value = null;
		offsetMark.value = "*";
	};

	return (
		<BillsContext.Provider
			value={{
				bills: isSearching.value ? null : bills.value,
				searchResults: searchResults.value,
				querySignal: query,
				resultsCount: searchResults.value?.count ?? 0,
				clearSearchResults: clearSearchResults,
				handleIntersection: handleIntersection,
				isSearching: isSearching.value,
				loading: (loading ?? false) || (searchResultsLoading ?? false),
				error: error || searchError,
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
