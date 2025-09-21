import { Grid } from "components/shared";
import type { ExecutiveOrder } from "types";
import { ExecutiveOrderCard } from "./ExecutiveOrderCard.tsx";

interface ExecutiveOrdersGridProps {
  executiveOrders: Array<ExecutiveOrder>;
}

const ExecutiveOrdersGrid = ({ executiveOrders }: ExecutiveOrdersGridProps) => {
  return (
    <Grid id="eo-grid">
      {executiveOrders.map((eo) => (
        <ExecutiveOrderCard key={`eo-card-${eo.document_number}`} {...eo} />
      ))}
    </Grid>
  );
};

export { ExecutiveOrdersGrid };
