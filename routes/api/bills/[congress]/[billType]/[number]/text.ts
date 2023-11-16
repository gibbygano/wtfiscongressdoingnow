import { Handlers, Status } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";
import { TextVersion } from "types";

const fetchTextVersions = async (congress: string, type: string, number: string) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestUrl = new URL(
		`https://api.congress.gov/v3/bill/${congress}/${type}/${number}/text`,
	);
	const queryParams = new URLSearchParams({
		format: "json",
	});
	requestUrl.search = queryParams.toString();

	const resp = await fetch(requestUrl, {
		headers: { "X-Api-Key": DataGovAPIKey },
	});
	if (!resp.ok) {
		throw new Error(resp.statusText);
	}

	return (await resp.json()).textVersions;
};

export const handler: Handlers<TextVersion[]> = {
	async GET(_req, ctx): Promise<Response> {
		try {
			const summaries = await fetchTextVersions(
				ctx.params.congress,
				ctx.params.billType,
				ctx.params.number,
			);
			return new Response(JSON.stringify(summaries));
		} catch (error) {
			return new Response(null, { status: Status.BadRequest, statusText: error.message });
		}
	},
};
