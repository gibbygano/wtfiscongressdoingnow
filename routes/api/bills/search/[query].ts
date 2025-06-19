import { Handlers } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";
import { CongressionalBills } from "types";

const searchBills = async (query: string, pageSize: number, offset: string) => {
    const { DataGovAPIKey } = getAppConfig();

    const requestUrl = new URL(`https://api.govinfo.gov/search`);
    const resp = await fetch(requestUrl, {
        method: "POST",
        headers: { "X-Api-Key": DataGovAPIKey, "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `${query} BILLS`,
            pageSize: pageSize,
            offsetMark: offset,
            sorts: [
                {
                    field: "relevancy",
                    sortOrder: "DESC",
                },
            ],
            historical: true,
            resultLevel: "default",
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
            const pageSize = Number(url.searchParams.get("pageSize"));
            const offset = url.searchParams.get("offset");

            const bills = await searchBills(
                ctx.params.query,
                pageSize == 0 ? 10 : pageSize,
                offset ?? "*",
            );
            return new Response(JSON.stringify(bills));
        } catch (error) {
            return new Response(null, { status: 500, statusText: (error as Error).message });
        }
    },
};
