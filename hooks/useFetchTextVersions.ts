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

	const { data, error, loading, statusText, status } = useFetch<TextVersion[]>(
		`/api/bills/${congress}/${billType}/${number}/text`,
		undefined,
	);

	if (data) {
		textVersions.value = data;
	}

	return { textVersions: textVersions.value, error, loading };
};

export default useFetchTextVersions;
