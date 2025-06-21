import { useSignal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";
import type { Action, Member, Reference } from "types";
import { useFetchActions, useFetchBillSummary } from "hooks";
import { uniqWith } from "es-toolkit";

interface BillSummaryContextValue {
	packageId: string;
	sponsors: Array<Member> | null;
	references: Array<Reference> | null;
	actions: Array<Action> | null;
	summaryLoading: boolean;
	summaryError: Error | undefined;
	actionsLoading: boolean;
	actionsError: Error | undefined;
	cardHasInteractionSignal: Signal<boolean>;
}

interface BillsSummaryContextProviderProps {
	packageId: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const BillSummaryContext = createContext<BillSummaryContextValue | null>(null);

const BillSummaryContextProvider = ({ packageId, children }: BillsSummaryContextProviderProps) => {
	const sponsors = useSignal<Array<Member> | null>(null);
	const references = useSignal<Array<Reference> | null>(null);
	const actions = useSignal<Array<Action> | null>(null);
	const cardHasInteraction = useSignal(false);

	const { loading, error } = useFetchBillSummary(
		packageId,
		(billSummary) => {
			sponsors.value = billSummary.members;
			references.value = billSummary.references;
		},
		cardHasInteraction.value && (!references.value && !sponsors.value),
	);

	const billIds = packageId.match("(\\d+)([a-z]+)(\\d+)([a-z]+)$") as RegExpMatchArray;
	const { error: actionsError, loading: actionsLoading } = useFetchActions(
		billIds[1],
		billIds[2],
		billIds[3],
		(responseObject) => {
			actions.value = uniqWith(
				responseObject,
				(arrVal: Action, othVal: Action) =>
					arrVal.text === othVal.text && arrVal.type === othVal.type &&
					arrVal.actionDate === othVal.actionDate,
			);
		},
		cardHasInteraction.value && !actions.value,
	);

	return (
		<BillSummaryContext.Provider
			value={{
				packageId,
				sponsors: sponsors.value,
				references: references.value,
				summaryLoading: loading ?? true,
				summaryError: error,
				actions: actions.value,
				actionsLoading: actionsLoading ?? true,
				actionsError: actionsError,
				cardHasInteractionSignal: cardHasInteraction,
			}}
		>
			{children}
		</BillSummaryContext.Provider>
	);
};

const useBillSummaryContext = (): BillSummaryContextValue => {
	const billsContext = useContext(BillSummaryContext);

	if (!billsContext) {
		throw new Error("useBillSummaryContext must be used within a BillSummaryContextProvider");
	}
	return billsContext;
};

export { BillSummaryContextProvider, useBillSummaryContext };
