import { Card, LinkButton } from "components";
import { RouteContext } from "$fresh/server.ts";
import { getAppConfig } from "appConfig";
import { Committee } from "types";
import { Partial } from "$fresh/runtime.ts";

const fetchCommittees = async (offset: string, limit: string) => {
	const { DataGovAPIKey } = getAppConfig();

	const requestUrl = new URL(
		`https://api.congress.gov/v3/committee/118`,
	);
	const queryParams = new URLSearchParams({
		offset: offset,
		limit: limit,
		format: "json",
		fromDateTime: "2023-04-26T00:00:00Z",
	});
	requestUrl.search = queryParams.toString();

	const resp = await fetch(requestUrl, {
		headers: { "X-Api-Key": DataGovAPIKey },
	});
	if (!resp.ok) {
		throw new Error(resp.statusText);
	}

	return (await resp.json()).committees;
};

export default async (req: Request, ctx: RouteContext) => {
	const committees: Committee[] = await fetchCommittees(ctx.params.offset, ctx.params.pagesize);

	return (
		<div class="flex-1 flex flex-col">
			<div class="pb-10 flex-1">
				<div
					class="grid lg:grid-cols-3 xl:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10"
					id="bills"
				>
					{committees.map((
						{ chamber, committeeTypeCode, name, subcommittees },
						i,
					) => (
						<Card
							key={committeeTypeCode + i.toString()}
							headerText={name}
						>
							<div f-client-nav>
								<p class="mt-1 text-lg text-gray-800 dark:text-gray-400 clear-left font-bold">
									{chamber} - {"118".ordinalize()} Congress
								</p>
								<p class="mt-1 text-lg text-white">Subcommittees</p>
								{subcommittees?.map(({ name, systemCode, url }) => (
									<Partial name={`subcommittee-${chamber}-${systemCode}`}>
										<LinkButton
											href={`/committees/${ctx.params.offset}/${ctx.params.pagesize}`}
											partialId={`/partials/committees/subcommittees/${chamber}/${systemCode}`}
										>
											{name}
										</LinkButton>
									</Partial>
								))}
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};
