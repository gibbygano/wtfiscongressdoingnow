import { Box, Card, CircularProgress } from "@mui/material";
import useFetchBills from "/hooks/useFetchBills.ts";
import "humanizer";
import BillCard, { Bill } from "/islands/BillCard.tsx";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: URL;
	previousPage?: URL;
	packages: Bill[];
}

const Bills = () => {
	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const { bills: { count, message, nextPage, previousPage, packages }, loading, error } = useFetchBills(fromDateISO);

	if (error.isError) {
		return (
			<div
				class="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				{error.message}
			</div>
		);
	}

	if (loading || packages.length === 0) {
		return (
			<Box className="h-screen flex items-center justify-center">
				<CircularProgress />
			</Box>
		);
	}
	return (
		<>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:text-sm lg:text-base text-xs  gap-3 p-10">
				{packages.map((p) => (
					<Card
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
						}}
						variant="outlined"
					>
						<BillCard {...p} />
					</Card>
				))}
			</div>
			<h1 class="font-bold m-5">
				{count} Results since {fromDate.toDateString()}. Showing 10 most recent.
			</h1>
		</>
	);
};

export default Bills;
