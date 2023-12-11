import { Handlers } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";
import { CongressionalBills } from "types";

const fetchBills = async (fromDate: string, pageSize: string, offset: string) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestUrl = new URL(
		`https://api.govinfo.gov/collections/BILLS/${fromDate}`,
	);
	const queryParams = new URLSearchParams({
		offset: offset,
		pageSize: pageSize,
	});
	requestUrl.search = queryParams.toString();

	const resp = await fetch(requestUrl, {
		headers: { "X-Api-Key": DataGovAPIKey },
	});
	if (!resp.ok) {
		throw new Error(resp.statusText);
	}

	return await resp.json();
};

export const handler: Handlers<CongressionalBills> = {
	async GET(req, ctx): Promise<Response> {
		try {
			const url = new URL(req.url);
			const pageSize = url.searchParams.get("pageSize");
			const offset = url.searchParams.get("offset");

			const bills = await fetchBills(ctx.params.fromDate, pageSize ?? "10", offset ?? "0");
			return new Response(JSON.stringify(bills));
		} catch (error) {
			return new Response(null, { status: 500, statusText: error.message });
		}
	},
};
