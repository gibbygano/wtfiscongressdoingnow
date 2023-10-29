import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Results {
	loading: boolean;
	status: number;
	statusText: string;
	error: Error;
}

export default <T>(
	url: string,
	headers: Record<string, string> = { "Content-Type": "application/json" },
	responseObjectSignal: Signal<T>,
): Results => {
	const loading = useSignal(false);
	const status = useSignal(0);
	const statusText = useSignal("");
	const error = useSignal<Error>({ name: "", message: "" });

	const internalFetch = async (
		url: string,
		headers: Record<string, string>,
		responseObjectSignal: Signal<T>,
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

			const object: T = await response.json();
			responseObjectSignal.value = object;
		} catch (error) {
			error.value = error;
		} finally {
			loading.value = false;
		}
	};

	useEffect(() => {
		internalFetch(url, headers, responseObjectSignal);
	}, [url]);

	return {
		loading: loading.value,
		status: status.value,
		statusText: statusText.value,
		error: error.value,
	};
};
