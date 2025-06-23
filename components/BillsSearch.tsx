import { debounce } from "es-toolkit/compat";
import { useBillsContext } from "context";
import { useEffect, useRef } from "preact/hooks";
import { TextInput } from "./shared/TextInput.tsx";

const BillsSearch = () => {
	const { querySignal, clearSearchResults, isSearching, resultsCount, loading } =
		useBillsContext();
	const searchRef = useRef<HTMLInputElement>(null);

	const handleTextEntry = debounce(
		() => {
			const currentQueryLength = searchRef.current?.value.length ?? 0;
			const newValue = searchRef.current?.value.trim() ?? null;
			if (
				(currentQueryLength >= 3 ||
					currentQueryLength === 0) && newValue != querySignal.value
			) {
				clearSearchResults();
				querySignal.value = newValue;
			}
		},
		300,
		{ trailing: true },
	);

	useEffect(() => {
		handleTextEntry.cancel();
	});

	const label = isSearching
		? `Results: ${loading ? "" : resultsCount}`
		: "Search Congressional Bills";

	return (
		<div class="md:flex">
			<div class="md:fixed sm:sticky md:ml-7 md:z-10 lg:columns-3 w-full 2xl:columns-4 3xl:ml-[412px] 3xl:mr-[412px] md:columns-2 md:gap-x-20 lg:gap-x-12 2xl:gap-x-10 3xl:gap-x-[295px]">
				<TextInput
					className="border-b-[1px] border-r-[1px] border-l-[1px] md:rounded-br-lg md:rounded-bl-lg"
					id="bills-search"
					inputRef={searchRef}
					label={label}
					showLoading={loading && isSearching}
					type="search"
					pattern="search"
					onSearch={handleTextEntry}
					onKeyUp={handleTextEntry}
				/>
			</div>
		</div>
	);
};

export { BillsSearch };
