import { useSignal } from "@preact/signals";
import { TextVersion } from "types";
import useFetch from "./useFetch.ts";

const useFetchTextVersions = (
	congress: string,
	billType: string,
	number: string,
	summariesContainerOpen: boolean,
) => {
	const textVersions = useSignal<TextVersion[]>([]);

	if (!summariesContainerOpen) {
		return { textVersions: textVersions.value, error: null, loading: false };
	}

	return {
		textVersions: textVersions.value,
		...useFetch(
			`/api/bills/${congress}/${billType}/${number}/text`,
			undefined,
			textVersions,
		),
	};
};

export default useFetchTextVersions;
