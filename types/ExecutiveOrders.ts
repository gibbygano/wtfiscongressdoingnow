import type ExecutiveOrder from "./ExecutiveOrder.ts";

interface ExecutiveOrders {
  count: number;
  description: string;
  total_pages: number;
  next_page_url: URL;
  results: Array<ExecutiveOrder>;
}

export type { ExecutiveOrders };
