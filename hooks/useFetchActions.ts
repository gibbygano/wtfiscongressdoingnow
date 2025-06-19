import { Signal } from "@preact/signals";
import { Action } from "types";
import useFetch from "./useFetch.ts";

const useFetchActions = (
	congress: string,
	billType: string,
	number: string,
	actions: Signal<Array<Action>>,
	actionsContainerOpen: boolean,
) => {
	return {
		...useFetch(
			`/api/bills/${congress}/${billType}/${number}`,
			undefined,
			actions,
			actionsContainerOpen,
		),
	};
};

export default useFetchActions;
