import { Bills } from "islands";
import { define } from "utils";
import { getAppConfig } from "appConfig";
import { page } from "fresh";



export const handler = define.handlers({
	async GET(ctx) {
		const { DataGovAPIKey } = getAppConfig();
		const fromIsoDate = new Date("04/26/2023").toISOString().split(".")[0] + "Z";
		const url = new URL(ctx.req.url);
		const pageSize = parseInt(url.searchParams.get("pageSize") ?? "12").toString();
		const offset = parseInt(url.searchParams.get("offset") ?? "0").toString();

		const requestUrl = new URL(
			`https://api.govinfo.gov/collections/BILLS/${fromIsoDate}`,
		);
		const queryParams = new URLSearchParams({
			offset: offset,
			pageSize: pageSize,
		});
		requestUrl.search = queryParams.toString();

		let isLoading = true;
		let apiError;
		let bills;
		try {
			const resp = await fetch(requestUrl, {
				headers: { "X-Api-Key": DataGovAPIKey },
			});
			if (!resp.ok) {
				throw new Error(resp.statusText);
			}

			bills = await resp.json();
		} catch (error) {
			apiError = error as Error;
		} finally {
			isLoading = false;
		}

		return page({pageSize, offset, bills, isLoading, apiError });
	},
});

export default define.page<typeof handler>(({data}) => (
	<Bills
		bills={data.bills}
		pageSize={data.pageSize}
		pageOffset={data.offset}
		isLoading={data.isLoading}
		error={data.apiError}
	/>
));
