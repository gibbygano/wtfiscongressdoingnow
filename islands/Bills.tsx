import useFetchBills from "/hooks/useFetchBills.ts";
import "humanizer";
import dayjs from "npm:dayjs";
import Card from "../components/Card.tsx";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: URL;
	previousPage?: URL;
	packages: Array<
		{
			packageId: string;
			lastModified: Date;
			packageLink: URL;
			docClass: string;
			title: string;
			congress: number;
			dateIssued: Date;
		}
	>;
}

export default () => {
	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		bills: { count, message, nextPage, previousPage, packages },
		loading,
		error,
		status,
		statusText,
	} = useFetchBills(fromDateISO);

	if (error.name) {
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
			<div className="h-screen flex items-center justify-center">
			</div>
		);
	}
	return (
		<>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:text-sm lg:text-base text-xs  gap-3 p-10">
				{packages.map((
					{ packageId, lastModified, dateIssued, title, docClass, congress },
				) => (
					<div>
						<Card
							headerText={title}
							href={`/api/bills/download/${packageId}?docType=pdf`}
							target="_blank"
							buttonText={"Download PDF"}
						>
							<p>PkgId: {packageId}</p>
							<p>Date Issued: {dayjs(dateIssued).format("MMMM DD YYYY")}</p>
							<p>Last Change: {dayjs(lastModified).format("MMMM DD YYYY")}</p>
						</Card>
					</div>
				))}
			</div>
			<h1 class="font-bold m-5">
				{count} Results since {fromDate.toDateString()}. Showing 25 most recent.
			</h1>
		</>
	);
};
