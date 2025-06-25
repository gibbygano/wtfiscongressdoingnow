import { CardGrid } from "components/shared";
import { ExecutiveOrderCard } from "./ExecutiveOrderCard.tsx";
import ExecutiveOrder from "../../types/ExecutiveOrder.ts";

interface ExecutiveOrdersGridProps {
	executiveOrders: Array<ExecutiveOrder>;
}

const ExecutiveOrdersGrid = ({ executiveOrders }: ExecutiveOrdersGridProps) => {
	return (
		<CardGrid id="eo-grid">
			{executiveOrders.map((eo) => (
				<ExecutiveOrderCard key={`eo-card-${eo.document_number}`} {...eo} />
			))}
		</CardGrid>
	);
};

export { ExecutiveOrdersGrid };
