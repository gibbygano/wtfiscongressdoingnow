import { JSX } from "preact/jsx-runtime";
import Card from "./Card.tsx";
import { LinkButton } from "components";
import BillSummaryAccordion from "/islands/BillSummaryAccordion.tsx";

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
	onNextOrPreviousClick: JSX.GenericEventHandler<HTMLSpanElement>;
};

export default (
	{ pageSize, packages, error, loading, previousPage, nextPage, onNextOrPreviousClick }: Props,
) => {
	return (
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
							PkgId: {packageId}
						</p>
						<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
							Date Issued: {new Date(dateIssued).toDateString()}
						</p>
						<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
							Last Change: {new Date(lastModified).toDateString()}
						</p>
						<BillSummaryAccordion packageId={packageId} />
					</Card>
				))}
			</div>
			{previousPage && (
				<a
					id="previousPage"
					onClick={onNextOrPreviousClick}
					class="cursor-pointer hover:underline left-10 bottom-3 absolute"
				>
					← Previous Page
				</a>
			)}
			{nextPage && (
				<a
					id="nextPage"
					onClick={onNextOrPreviousClick}
					class="cursor-pointer hover:underline lg:col-start-3 md:col-start-2 absolute right-10 bottom-3"
				>
					Next Page →
				</a>
			)}
		</div>
	);
};
