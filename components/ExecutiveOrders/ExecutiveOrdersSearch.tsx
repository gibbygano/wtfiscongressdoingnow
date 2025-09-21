import { Search } from "components/shared";
import { useExecutiveOrderContext } from "context";
import { JSX } from "preact";

const ExecutiveOrdersSearch = () => {
  const { querySignal, clearSearchResults, count, loading, isSearching } =
    useExecutiveOrderContext();

  const handleSearch = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
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
    ? `Results: ${loading ? "" : count}`
    : "Search Executive Orders";

  return (
    <Search
      label={label}
      isLoading={loading && isSearching}
      id="eo-search"
      callback={handleSearch}
    />
  );
};

export { ExecutiveOrdersSearch };
