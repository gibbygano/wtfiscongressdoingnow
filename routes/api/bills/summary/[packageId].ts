import { CongressionalBillSummary } from "types";
import { Handlers } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";

const fetchRelatedInfo = async (packageId: string) => {
	const { DataGovAPIKey } = getAppConfig();
	const requestUrl = new URL(
		`https://api.govinfo.gov/packages/${packageId}/summary`,
	);
	const resp = await fetch(requestUrl, {
		headers: {
			"X-Api-Key": DataGovAPIKey,
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
	});

	if (!resp.ok) {
		throw new Error(resp.statusText);
	}
	return await resp.json();
};

export const handler: Handlers<CongressionalBillSummary> = {
	async GET(_req, ctx) {
		const data = await fetchRelatedInfo(ctx.params.packageId);
		return new Response(JSON.stringify(data));
	},
};
