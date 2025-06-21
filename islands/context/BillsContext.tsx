import { useComputed, useSignal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";
import type { CongressionalBills } from "types";
import { useFetchBills } from "hooks";

interface BillsContextValue {
	bills: CongressionalBills | null;
	offsetUnsafeSignal: Signal<string | null>;
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

	return (
		<BillsContext.Provider
			value={{
				bills: bills.value,
				offsetUnsafeSignal: offsetUnsafe,
				loading: loading ?? false,
				error: error,
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
