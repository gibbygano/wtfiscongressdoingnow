// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_bills_congress_billType_number_ from "./routes/api/bills/[congress]/[billType]/[number].ts";
import * as $api_bills_fromDate_ from "./routes/api/bills/[fromDate].ts";
import * as $api_bills_download_packageId_ from "./routes/api/bills/download/[packageId].ts";
import * as $api_bills_search_query_ from "./routes/api/bills/search/[query].ts";
import * as $api_bills_summary_packageId_ from "./routes/api/bills/summary/[packageId].ts";
import * as $api_eo_index from "./routes/api/eo/index.ts";
import * as $executive_orders from "./routes/executive-orders.tsx";
import * as $index from "./routes/index.tsx";
import * as $BillSummaryAccordion from "./islands/BillSummaryAccordion.tsx";
import * as $Bills from "./islands/Bills.tsx";
import * as $BillsNav from "./islands/BillsNav.tsx";
import * as $ExecutiveOrders from "./islands/ExecutiveOrders.tsx";
import * as $index_1 from "./islands/index.ts";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
	routes: {
		"./routes/_404.tsx": $_404,
		"./routes/_app.tsx": $_app,
		"./routes/api/bills/[congress]/[billType]/[number].ts":
			$api_bills_congress_billType_number_,
		"./routes/api/bills/[fromDate].ts": $api_bills_fromDate_,
		"./routes/api/bills/download/[packageId].ts": $api_bills_download_packageId_,
		"./routes/api/bills/search/[query].ts": $api_bills_search_query_,
		"./routes/api/bills/summary/[packageId].ts": $api_bills_summary_packageId_,
		"./routes/api/eo/index.ts": $api_eo_index,
		"./routes/executive-orders.tsx": $executive_orders,
		"./routes/index.tsx": $index,
	},
	islands: {
		"./islands/BillSummaryAccordion.tsx": $BillSummaryAccordion,
		"./islands/Bills.tsx": $Bills,
		"./islands/BillsNav.tsx": $BillsNav,
		"./islands/ExecutiveOrders.tsx": $ExecutiveOrders,
		"./islands/index.ts": $index_1,
	},
	baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
