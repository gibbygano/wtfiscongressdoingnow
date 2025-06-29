import { Grid } from "components/shared";
import { BillSummaryContextProvider } from "context";
import type { CongressionalBill } from "types";
import { BillCard } from "./BillCard.tsx";

interface BillsGridProps {
	packages: Array<CongressionalBill>;
}

const BillsGrid = ({ packages }: BillsGridProps) => {
	return (
		<Grid id="bills-grid">
			{packages.map((p) => (
				<BillSummaryContextProvider packageId={p.packageId}>
					<BillCard {...p} />
				</BillSummaryContextProvider>
			))}
		</Grid>
	);
};

export { BillsGrid };
