import { JSX } from "preact/jsx-runtime";
import Card from "./Card.tsx";
import { LinkButton } from "components";
import BillSummaryAccordion from "/islands/BillSummaryAccordion.tsx";
import dayjs from "dayjs";

export interface CongressionalBill {
	packageId: string;
	lastModified: Date;
	packageLink: URL;
	docClass: string;
	title: string;
	congress: number;
	dateIssued: Date;
}

type Props = {
	pageSize: string;
	packages: Array<CongressionalBill>;
	error: Error;
	loading: boolean;
	previousPage?: string;
	nextPage?: string;
};

export default (
	{ packages, error, loading, previousPage, nextPage }: Props,
) => {
	return (
		<>
			<div class="relative">
				<div
					class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:text-sm lg:text-base text-xs gap-3 p-10"
					id="bills"
				>
					{packages.map((
						{ packageId, lastModified, dateIssued, title, docClass, congress },
					) => (
						<Card
							key={packageId}
							headerText={title}
							actionChildren={
								<LinkButton
									href={`/api/bills/download/${packageId}?docType=pdf`}
									target="_blank"
								>
									Download PDF
								</LinkButton>
							}
						>
							<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
								Package Id: {packageId}
							</p>
							<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
								Date Issued: {dayjs(dateIssued).format("dddd MMMM D, YYYY")}
							</p>
							<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
								Last Change: {dayjs(lastModified).format("dddd MMMM D, YYYY")}
							</p>
							<BillSummaryAccordion packageId={packageId} />
						</Card>
					))}
				</div>
			</div>
		</>
	);
};
