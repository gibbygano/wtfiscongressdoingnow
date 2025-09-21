import type { Signal } from "@preact/signals";
import { useFetchBills, useFetchBillsSearchResults } from "hooks";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";

import { useComputed, useSignal } from "@preact/signals";

import type { BillsCollectionSearchResults, CongressionalBills } from "types";

interface BillsContextValue {
  bills: CongressionalBills | null;
  searchResults: BillsCollectionSearchResults | null;
  isSearching: boolean;
  clearSearchResults: () => void;
  handleIntersection: (entries: IntersectionObserverEntry[]) => void;
  resultsCount: number;
  querySignal: Signal<string | null>;
  loading: boolean;
  error: Error | null;
}

interface BillsContextProviderProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const BillsContext = createContext<BillsContextValue | null>(null);

const BillsContextProvider = ({ children }: BillsContextProviderProps) => {
  const bills = useSignal<CongressionalBills | null>(null);
  const pageSize = useSignal(12);
  const offsetUnsafe = useSignal<string | null>("0");
  const offsetSafe = useComputed(() => offsetUnsafe.value ?? "0");

  const searchResults = useSignal<BillsCollectionSearchResults | null>(null);
  const query = useSignal<string | null>(null);
  const offsetMark = useSignal("*");
  const isSearching = useComputed(() => (query.value?.length ?? 0) > 0);

  const fromDate = new Date("04/26/2023");
  const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
  const { loading, error } = useFetchBills(
    fromDateISO,
    pageSize.value,
    offsetSafe.value,
    (congressionalBills) =>
      (bills.value = {
        packages: bills.value?.packages
          ? [...bills.value?.packages, ...congressionalBills.packages]
          : congressionalBills.packages,
        count: bills.value?.count ?? 0 + congressionalBills.count,
        message: congressionalBills.message,
        nextPage: congressionalBills.nextPage,
      }),
  );

  const { loading: searchResultsLoading, error: searchError } =
    useFetchBillsSearchResults(
      query.value,
      offsetMark.value,
      pageSize.value,
      (responseObject) =>
        (searchResults.value = {
          results: searchResults.value?.results
            ? [...searchResults.value.results, ...responseObject.results]
            : responseObject.results,
          count: responseObject.count,
          offsetMark: responseObject.offsetMark,
        }),
      isSearching.value,
    );

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if (
        isSearching.value &&
        searchResults.value?.offsetMark &&
        searchResults.value.count > pageSize.value
      ) {
        offsetMark.value = searchResults.value.offsetMark;
      }
      if (
        !isSearching.value &&
        bills.value?.nextPage &&
        bills.value.count > pageSize.value
      ) {
        offsetUnsafe.value = new URL(bills.value.nextPage).searchParams.get(
          "offset",
        );
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
        loading: loading || searchResultsLoading,
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
    throw new Error(
      "useBillsContext must be used within a BillsContextProvider",
    );
  }
  return billsContext;
};

export { BillsContextProvider, useBillsContext };
