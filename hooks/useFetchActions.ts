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

	const { data, loading, error, status, statusText } = useFetch<Action[]>(
		`/api/bills/${congress}/${billType}/${number}/actions`,
		undefined,
	);

	if (data) {
		actions.value = data;
	}

	return {actions: actions.value, loading, error}
};

export default useFetchActions;
