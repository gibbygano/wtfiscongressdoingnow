import { getAppConfig } from "appConfig";
import { define } from "utils";

const fetchBills = async (fromDate: string, pageSize: string, offset: string) => {
	const { DataGovAPIKey } = getAppConfig();
	const fromIsoDate = new Date(fromDate).toISOString().split(".")[0] + "Z";

	const requestUrl = new URL(
		`https://api.govinfo.gov/collections/BILLS/${fromIsoDate}`,
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

export const handler = define.handlers({
	async GET(ctx) {
		const req = ctx.req;

		try {
			const url = new URL(req.url);
			const pageSize = url.searchParams.get("pageSize");
			const offset = url.searchParams.get("offset");

			const bills = await fetchBills(ctx.params.fromDate, pageSize ?? "10", offset ?? "0");
			return new Response(JSON.stringify(bills));
		} catch (error) {
			return new Response(null, { status: 500, statusText: (error as Error).message });
		}
	},
});
