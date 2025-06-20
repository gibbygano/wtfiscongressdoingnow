import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Results {
	loading: boolean | undefined;
	status: number | undefined;
	statusText: string | undefined;
	error: Error | undefined;
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
	const loading = useSignal<boolean>();
	const status = useSignal<number>(0);
	const statusText = useSignal<string>();
	const error = useSignal<Error>();

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
				console.log(response.statusText);
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
