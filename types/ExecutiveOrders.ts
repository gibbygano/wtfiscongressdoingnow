import type ExecutiveOrder from "./ExecutiveOrder.ts";

export default interface ExecutiveOrders {
	count: number;
	description: string;
	total_pages: number;
	next_page: URL;
	results: Array<ExecutiveOrder>;
}
