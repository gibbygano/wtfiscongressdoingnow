import { Bills } from "islands";
import { define } from "utils";
import { getAppConfig } from "appConfig";
import { page } from "fresh";

export const handler = define.handlers({
	async GET(ctx) {
		const { DataGovAPIKey } = getAppConfig();
		const fromIsoDate = new Date("04/26/2023").toISOString().split(".")[0] + "Z";

		const url = new URL(ctx.req.url);
		const pageSize = parseInt(url.searchParams.get("pageSize") ?? "12");
		const offset = parseInt(url.searchParams.get("offset") ?? "0");

		ctx.state.billsLoading = true;
		ctx.state.billsOffset = offset.toString();
		ctx.state.billsPageSize = pageSize.toString();

		const requestUrl = new URL(
			`https://api.govinfo.gov/collections/BILLS/${fromIsoDate}`,
		);
		const queryParams = new URLSearchParams({
			offset: ctx.state.billsOffset.toString(),
			pageSize: ctx.state.billsPageSize.toString(),
		});
		requestUrl.search = queryParams.toString();

		try {
			const resp = await fetch(requestUrl, {
				headers: { "X-Api-Key": DataGovAPIKey },
			});
			if (!resp.ok) {
				throw new Error(resp.statusText);
			}

			ctx.state.currentBills = await resp.json();
		} catch (error) {
			ctx.state.billsError = error as Error;
		} finally {
			ctx.state.billsLoading = false;
		}

		return page();
	},
});

export default define.page<typeof handler>(({ state }) => (
	<Bills
		bills={state.currentBills}
		pageSize={state.billsPageSize}
		pageOffset={state.billsOffset}
		isLoading={state.billsLoading}
		error={state.billsError}
	/>
));
