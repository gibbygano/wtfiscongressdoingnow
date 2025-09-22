import type { Signal } from "@preact/signals";
import { useSignal } from "@preact/signals";
import { uniqWith } from "es-toolkit";
import { useFetchActions, useFetchBillSummary } from "hooks";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";
import type { Action, Member, Reference } from "types";
import { mapBillStatus } from "utils";

interface BillSummaryContextValue {
  packageId: string;
  congress: string;
  docClass: string;
  docId: string;
  docStatus: string;
  versionNumber?: string;
  sponsors: Array<Member> | null;
  references: Array<Reference> | null;
  actions: Array<Action> | null;
  summaryLoading: boolean;
  summaryError: Error | null;
  actionsLoading: boolean;
  actionsError: Error | null;
  cardHasInteractionSignal: Signal<boolean>;
}

interface BillsSummaryContextProviderProps {
  packageId: string;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const BillSummaryContext = createContext<BillSummaryContextValue | null>(null);

const BillSummaryContextProvider = ({
  packageId,
  children,
}: BillsSummaryContextProviderProps) => {
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
    cardHasInteraction.value && !references.value && !sponsors.value,
  );

  const packageGroups = packageId
    .split("BILLS-")[1]
    .match(/([\d]+)([a-zA-Z]+)([\d]+)([a-zA-Z]+)([\d]+)?/) as RegExpMatchArray;

  const congress = packageGroups[1];
  const docClass = packageGroups[2];
  const docId = packageGroups[3];
  const docStatus = mapBillStatus(packageGroups[4]);
  const versionNumber = packageGroups[5];

  const { error: actionsError, loading: actionsLoading } = useFetchActions(
    congress,
    docClass,
    docId,
    (responseObject) => {
      actions.value = uniqWith(
        responseObject,
        (arrVal: Action, othVal: Action) =>
          arrVal.text === othVal.text &&
          arrVal.actionDate === othVal.actionDate,
      );
    },
    cardHasInteraction.value && !actions.value,
  );

  return (
    <BillSummaryContext.Provider
      value={{
        packageId,
        congress,
        docClass: docClass.toUpperCase(),
        docId,
        docStatus,
        versionNumber,
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
    throw new Error(
      "useBillSummaryContext must be used within a BillSummaryContextProvider",
    );
  }
  return billsContext;
};

export { BillSummaryContextProvider, useBillSummaryContext };
