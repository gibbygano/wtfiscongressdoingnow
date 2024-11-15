import { Handlers } from "$fresh/server.ts";
import { type ExecutiveOrders } from "types";

const fetchExecutiveOrders = async (pageSize: number, page: number) => {
	const requestUrl = new URL(
		`https://www.federalregister.gov/api/v1/documents.json?per_page=${pageSize}&page=${page}&conditions[presidential_document_type][]=executive_order`,
	);

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

			const executiveOrders = await fetchExecutiveOrders(
				pageSize ?? 10,
				page ?? 1,
			);
			return new Response(JSON.stringify(executiveOrders));
		} catch (error) {
			if (error instanceof Error) {
				return new Response(null, { status: 500, statusText: error.message });
			}

			throw error;
		}
	},
};
