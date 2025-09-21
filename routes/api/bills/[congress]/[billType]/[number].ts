import { Action } from "types";
import { getAppConfig } from "appConfig";
import { define } from "../../../../../utils.ts";

const fetchActions = async (congress: string, type: string, number: string) => {
  const { DataGovAPIKey } = getAppConfig();

  const requestUrl = new URL(
    `https://api.congress.gov/v3/bill/${congress}/${type}/${number}/actions`,
  );
  const queryParams = new URLSearchParams({
    format: "json",
  });
  requestUrl.search = queryParams.toString();

  const resp = await fetch(requestUrl, {
    headers: { "X-Api-Key": DataGovAPIKey },
  });
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return (await resp.json()).actions;
};

export const handler = define.handlers<Action[]>({
  async GET(ctx) {
    try {
      const actions = await fetchActions(
        ctx.params.congress,
        ctx.params.billType,
        ctx.params.number,
      );
      return new Response(JSON.stringify(actions));
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
