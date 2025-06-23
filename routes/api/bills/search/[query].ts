import { BillsCollectionSearchResults } from "types";
import { Handlers } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";

const searchBills = async (query: string, pageSize: number, offsetMark: string) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestBody = JSON.stringify({
		query,
		pageSize: pageSize,
		offsetMark: offsetMark,
		sorts: [
			{
				field: "relevancy",
				sortOrder: "DESC",
			},
		],
		resultLevel: "package",
		historical: false,
	});

	const resp = await fetch("https://api.govinfo.gov/search", {
		method: "POST",
		headers: { "X-Api-Key": DataGovAPIKey, "Content-Type": "application/json" },
		body: requestBody,
	});
	if (!resp.ok) {
		throw new Error(
			JSON.stringify({ url: resp.url, statusCode: resp.status, message: resp.statusText }),
		);
	}

	return await resp.json();
};

export const handler: Handlers<BillsCollectionSearchResults> = {
	async GET(req, ctx): Promise<Response> {
		try {
			const url = new URL(req.url);
			const pageSize = Number(url.searchParams.get("pageSize"));
			const offsetMark = url.searchParams.get("offsetMark");

			const bills = await searchBills(
				decodeURI(ctx.params.query),
				pageSize == 0 ? 10 : pageSize,
				offsetMark ?? "*",
			);
			return new Response(JSON.stringify(bills));
		} catch (error) {
			console.error("[Search API Error]", (error as Error).message);
			return new Response(JSON.stringify({ count: 0, results: null }));
		}
	},
};
