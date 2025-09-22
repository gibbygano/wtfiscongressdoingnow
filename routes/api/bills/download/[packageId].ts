import { getAppConfig } from "appConfig";
import { define } from "../../../../utils.ts";

const fetchDoc = async (packageId: string, docType: string | null) => {
  if (!docType) throw new Error("Request document type must be defined");

  const { DataGovAPIKey } = getAppConfig();
  const requestUrl = new URL(
    `https://api.govinfo.gov/packages/${packageId}/${docType}`,
  );
  const queryParams = new URLSearchParams({
    offset: "0",
    pageSize: "10",
  });
  requestUrl.search = queryParams.toString();

  const resp = await fetch(requestUrl, {
    headers: {
      "X-Api-Key": DataGovAPIKey,
      Accept: "application/octet-stream",
    },
  });
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return await resp.blob();
};

export const handler = define.handlers<Blob>({
  async GET(ctx) {
    const req = ctx.req;
    const url = new URL(req.url);
    const docType = url.searchParams.get("docType");
    const doc = await fetchDoc(ctx.params.packageId, docType);
    return new Response(doc);
  },
});
