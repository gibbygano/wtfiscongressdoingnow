import { Handlers } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";
import { CongressionalBills } from "types";

const searchBills = async (
	search: string,
	pageSize: string | null = "10",
	offsetMark: string | null = "*",
) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestUrl = new URL(
		`https://api.govinfo.gov/search`,
	);

	const resp = await fetch(requestUrl, {
		headers: { "X-Api-Key": DataGovAPIKey },
		method: "POST",
		body: JSON.stringify({
			query: search,
			resultLevel: "pacakge",
			pageSize,
			offsetMark,
			sorts: [
				{
					field: "relevancy",
					sortOrder: "DESC",
				},
			],
		}),
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
			const offsetMark = url.searchParams.get("offsetMark");

			const bills = await searchBills(ctx.params.search, pageSize, offsetMark);
			return new Response(JSON.stringify(bills));
		} catch (error) {
			return new Response(null, { status: 500, statusText: (error as Error).message });
		}
	},
};
