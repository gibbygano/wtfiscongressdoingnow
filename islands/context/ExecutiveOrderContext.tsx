import { JSX, createContext } from "preact";

import type { ExecutiveOrders } from "types";
import type { Signal } from "@preact/signals";
import { useContext } from "preact/hooks";
import { useFetchExecutiveOrders } from "hooks";
import { useSignal } from "@preact/signals";

interface ExecutiveOrderContextValue {
	executiveOrders: ExecutiveOrders | null;
	pageSignal: Signal<string>;
	loading: boolean;
	error: Error | undefined;
}

interface ExecutiveOrderContextProviderProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const ExecutiveOrderContext = createContext<ExecutiveOrderContextValue | null>(null);

const ExecutiveOrderContextProvider = ({ children }: ExecutiveOrderContextProviderProps) => {
	const executiveOrders = useSignal<ExecutiveOrders | null>(null);
	const page = useSignal("1");

	const { loading, error } = useFetchExecutiveOrders(
		(responseObject) => {
			executiveOrders.value = {
				results: executiveOrders.value
					? [...executiveOrders.value?.results, ...responseObject.results]
					: responseObject.results,
				description: responseObject.description,
				next_page_url: responseObject.next_page_url,
				count: responseObject.count,
				total_pages: responseObject.total_pages,
			};
		},
		page.value,
	);

	return (
		<ExecutiveOrderContext.Provider
			value={{
				executiveOrders: executiveOrders.value,
				pageSignal: page,
				loading: loading ?? true,
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
