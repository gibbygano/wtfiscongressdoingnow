
export default async (downloadUrl: string, acceptHeader: string) => {
	const response = await fetch(downloadUrl, {
		headers: {
			"Accept": acceptHeader,
		},
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.blob();
};
