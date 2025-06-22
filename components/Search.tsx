import { debounce } from "es-toolkit/compat";
import { useBillsContext } from "context";
import { useRef } from "preact/hooks";

const Search = () => {
	const { querySignal, clearSearchResults, isSearching, resultsCount, loading } =
		useBillsContext();
	const searchRef = useRef<HTMLInputElement>(null);

	const processInput = () => {
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
			{ trailing: true, leading: true },
		);

		handleTextEntry();
	};

	return (
		<div class="fixed z-10 ml-7 w-60">
			<div class="relative">
				<input
					ref={searchRef}
					onKeyUp={processInput}
					onSearch={processInput}
					id="bills-search"
					type="search"
					class="block border-b-[1px] border-r-[1px] border-l-[1px] rounded-br-lg rounded-bl-lg px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 peer bg-white"
					placeholder=" "
				/>
				<label
					for="bills-search"
					class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
				>
					{isSearching
						? `Results: ${loading ? "Searching..." : resultsCount}`
						: "Search Congressional Bills"}
				</label>
			</div>
		</div>
	);
};

export { Search };
