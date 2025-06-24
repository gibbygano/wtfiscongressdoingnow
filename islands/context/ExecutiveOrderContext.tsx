import type { Signal } from "@preact/signals";
import { useComputed, useSignal } from "@preact/signals";
import { useFetchExecutiveOrders } from "hooks";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";
import type { ExecutiveOrders } from "types";

interface ExecutiveOrderContextValue {
	executiveOrders: ExecutiveOrders | null;
	count: number;
	pageSignal: Signal<string>;
	querySignal: Signal<string | null>;
	loading: boolean;
	isSearching: boolean;
	clearSearchResults: () => void;
	error: Error | null;
}

interface ExecutiveOrderContextProviderProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const ExecutiveOrderContext = createContext<ExecutiveOrderContextValue | null>(null);

const ExecutiveOrderContextProvider = ({ children }: ExecutiveOrderContextProviderProps) => {
	const executiveOrders = useSignal<ExecutiveOrders | null>(null);
	const executiveOrdersResults = useSignal<ExecutiveOrders | null>(null);
	const page = useSignal("1");
	const query = useSignal<string | null>(null);
	const isSearching = useComputed(() => (query.value?.length ?? 0) > 0);
	const currentTarget = useComputed(() => isSearching ? executiveOrdersResults : executiveOrders);

	const { loading, error } = useFetchExecutiveOrders(
		(responseObject) => {
			currentTarget.value.value = {
				results: currentTarget.value.value
					? [...currentTarget.value.value?.results, ...responseObject.results]
					: responseObject.results,
				description: responseObject.description,
				next_page_url: responseObject.next_page_url,
				count: responseObject.count,
				total_pages: responseObject.total_pages,
			};
		},
		page.value,
		query.value,
	);

	const clearSearchResults = () => {
		query.value = null;
		executiveOrdersResults.value = null;
	};

	return (
		<ExecutiveOrderContext.Provider
			value={{
				executiveOrders: currentTarget.value.value,
				count: currentTarget.value.value?.count ?? 0,
				pageSignal: page,
				clearSearchResults,
				isSearching: isSearching.value,
				querySignal: query,
				loading: loading,
				error,
			}}
		>
			{children}
		</ExecutiveOrderContext.Provider>
	);
};

const useExecutiveOrderContext = (): ExecutiveOrderContextValue => {
	const billsContext = useContext(ExecutiveOrderContext);

	if (!billsContext) {
		throw new Error(
			"useExecutiveOrderContext must be used within a ExecutiveOrderContextProvider",
		);
	}
	return billsContext;
};

export { ExecutiveOrderContextProvider, useExecutiveOrderContext };

