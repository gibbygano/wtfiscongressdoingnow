import type { Action } from "types";
import useFetch from "./useFetch.ts";

const useFetchActions = (
	congress: string,
	billType: string,
	number: string,
	callback: (responseObject: Array<Action>) => void,
	enable: boolean,
) => {
	return {
		...useFetch(
			`/api/bills/${congress}/${billType}/${number}`,
			callback,
			enable,
		),
	};
};

export default useFetchActions;
