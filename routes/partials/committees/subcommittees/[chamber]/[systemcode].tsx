import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import { getAppConfig } from "appConfig";

export const config: RouteConfig = {
	skipAppWrapper: true,
	skipInheritedLayouts: true,
};

const fetchSubcommittee = async (chamber: string, systemCode: string) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestUrl = new URL(
		`https://api.congress.gov/v3/committee/${chamber.toLowerCase()}/${systemCode}`,
	);
	const queryParams = new URLSearchParams({
		format: "json",
	});
	requestUrl.search = queryParams.toString();

	console.log(requestUrl);
	const resp = await fetch(requestUrl, {
		headers: { "X-Api-Key": DataGovAPIKey },
	});
	if (!resp.ok) {
		throw new Error(resp.statusText);
	}

	return await resp.json();
};

export default defineRoute(async (req, ctx) => {
	const content = await fetchSubcommittee(ctx.params.chamber, ctx.params.systemcode);
	console.log(content);
	return (
		<Partial name={`subcommittee-${ctx.params.chamber}-${ctx.params.systemcode}`}>
			<p class="mt-1 text-lg text-white dark:text-gray-400 clear-left font-bold">
				{JSON.stringify(content)}
			</p>
		</Partial>
	);
});
