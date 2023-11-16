import { useSignal } from "@preact/signals";
import { Action } from "types";
import useFetch from "./useFetch.ts";

const useFetchActions = (
	congress: string,
	billType: string,
	number: string,
	actionsContainerOpen: boolean,
) => {
	const actions = useSignal<Action[]>([]);

	if (!actionsContainerOpen) {
		return { actions: actions.value, error: null, loading: false };
	}

	return {
		actions: actions.value,
		...useFetch(
			`/api/bills/${congress}/${billType}/${number}/actions`,
			undefined,
			actions,
		),
	};
};

export default useFetchActions;
