import type ExecutiveOrder from "./ExecutiveOrder.ts";

interface ExecutiveOrders {
	count: number;
	description: string;
	total_pages: number;
	next_page: URL;
	results: Array<ExecutiveOrder>;
}

const defaultProps: ExecutiveOrders = {
	count: 0,
	description: "",
	total_pages: 0,
	next_page: new URL("http://127.0.0.1"),
	results: [],
};

export { defaultProps, type ExecutiveOrders };
