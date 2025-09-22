import { Search } from "components/shared";
import { useBillsContext } from "context";
import { TargetedKeyboardEvent } from "preact";

const BillsSearch = () => {
  const {
    querySignal,
    clearSearchResults,
    isSearching,
    resultsCount,
    loading,
  } = useBillsContext();

  const handleSearch = (e: TargetedKeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const currentQueryLength = target.value?.length ?? 0;
    const newValue = target?.value.trim() ?? null;
    if (
      (currentQueryLength >= 3 || currentQueryLength === 0) &&
      newValue != querySignal.value
    ) {
      clearSearchResults();
      querySignal.value = newValue;
    }
  };

  const label = isSearching
    ? `Results: ${loading ? "" : resultsCount}`
    : "Search Congressional Bills";

  return (
    <Search
      label={label}
      isLoading={loading && isSearching}
      id="bills-search"
      callback={handleSearch}
    />
  );
};

export { BillsSearch };
