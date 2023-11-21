import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Results<T> {
	loading: boolean;
	status: number;
	statusText: string;
	error: Error;
	data: T | undefined;
}

export default <T>(
	url: string,
	headers: Record<string, string> = {
		"Content-Type": "application/json",
		"Accpet": "application/json",
	},
): Results<T> => {
	const loading = useSignal(false);
	const status = useSignal(0);
	const statusText = useSignal("");
	const error = useSignal<Error>({ name: "", message: "" });
	const data = useSignal<T | undefined>(undefined);

	const internalFetch = async (
		url: string,
		headers: Record<string, string>,
	) => {
		loading.value = true;
		try {
			const response = await fetch(url, { headers: headers });
			status.value = response.status;
			statusText.value = response.statusText;

			if (!response.ok) {
				console.log(response.statusText);
				throw new Error(response.statusText);
			}

			data.value = await response.json();
		} catch (error) {
			error.value = error;
		} finally {
			loading.value = false;
		}
	};

	useEffect(() => {
		internalFetch(url, headers);
	}, [url]);

	return {
		loading: loading.value,
		status: status.value,
		statusText: statusText.value,
		error: error.value,
		data: data.value,
	};
};
