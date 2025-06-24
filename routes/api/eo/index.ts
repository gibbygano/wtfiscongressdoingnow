import { Handlers } from "$fresh/server.ts";
import type { ExecutiveOrders } from "types";

const fetchExecutiveOrders = async (pageSize: number, page: number, query?: string | null) => {
	const requestUrl = new URL(
		"https://www.federalregister.gov/api/v1/documents.json",
	);
	const queryParams = new URLSearchParams({
		per_page: pageSize.toString(),
		page: page.toString(),
		"conditions[presidential_document_type][]": "executive_order",
	});

	if (query) {
		queryParams.append("conditions[term]", query);
	}

	requestUrl.search = queryParams.toString();

	const resp = await fetch(requestUrl);
	if (!resp.ok) {
		throw new Error(resp.statusText);
	}

	return await resp.json();
};

export const handler: Handlers<ExecutiveOrders> = {
	async GET(req, _): Promise<Response> {
		try {
			const url = new URL(req.url);
			const pageSize = url.searchParams.get("pageSize") as number | null;
			const page = url.searchParams.get("page") as number | null;
			const query = url.searchParams.get("query") as string | null;

			const executiveOrders = await fetchExecutiveOrders(
				pageSize ?? 10,
				page ?? 1,
				query,
			);
			return new Response(JSON.stringify(executiveOrders));
		} catch (error) {
			return new Response(null, { status: 500, statusText: (error as Error).message });
		}
	},
};
