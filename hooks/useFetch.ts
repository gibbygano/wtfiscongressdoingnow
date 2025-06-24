import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface Results {
	loading: boolean;
	status: number | undefined;
	statusText: string | undefined;
	error: Error | null;
}

interface Options {
	headers: Record<string, string>;
}

export default <T>(
	url: string,
	callback: (responseObject: T) => void,
	enable = true,
	options: Options = {
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
	},
): Results => {
	const loading = useSignal(false);
	const status = useSignal<number>();
	const statusText = useSignal<string>();
	const error = useSignal<Error | null>(null);

	const internalFetch = async (
		url: string,
		options: Options,
		callback: (responseObject: T) => void,
	) => {
		loading.value = true;
		try {
			const response = await fetch(url, { headers: options.headers });
			status.value = response.status;
			statusText.value = response.statusText;

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const object: T = await response.json();
			callback(object);
		} catch (e) {
			error.value = e as Error;
		} finally {
			loading.value = false;
		}
	};

	useEffect(() => {
		if (enable) {
			internalFetch(url, options, callback);
		}
	}, [url, enable]);

	return {
		loading: loading.value,
		status: status.value,
		statusText: statusText.value,
		error: error.value,
	};
};
