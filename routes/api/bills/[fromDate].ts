import { Handlers, Status } from "$fresh/server.ts";
import { CongressionalBills } from "/islands/Bills.tsx";
import { getAppConfig } from "appConfig";

const fetchBills = async (fromDate: string) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestUrl = new URL(
		`https://api.govinfo.gov/collections/BILLS/${fromDate}`,
	);
	const queryParams = new URLSearchParams({
		offset: "0",
		pageSize: "10",
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
	async GET(_req, ctx): Promise<Response> {
		try {
			const bills = await fetchBills(ctx.params.fromDate);
			return new Response(JSON.stringify(bills));
		} catch (error) {
			return new Response(null, { status: Status.BadRequest, statusText: error.message });
		}
	},
};
