import "humanizer/ordinalize.ts";

import { Card, LinkButton } from "components";

import { BillSummaryAccordion } from "islands";
import { BillSummaryContextProvider } from "context";
import type { CongressionalBillSearchResult } from "types";
import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import dayjs from "dayjs";

interface SearchResultsGridProps {
	packages: Array<CongressionalBillSearchResult>;
}

const SearchResultsGrid = ({ packages }: SearchResultsGridProps) => {
	return (
		<>
			<div class="pb-16 flex-1">
				<div
					class="lg:columns-3 2xl:columns-4 3xl:ml-96 3xl:mr-96 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-14"
					id="bills"
				>
					{packages.map((
						{ packageId, lastModified, dateIssued, title },
					) => (
						<BillSummaryContextProvider packageId={packageId}>
							<Card
								key={`${packageId}-card`}
								headerText={packageId}
								actionChildren={[
									<BillSummaryAccordion
										key={`${packageId}-accordion`}
									/>,
									<LinkButton
										key={`${packageId}-pdf`}
										className="mt-7"
										href={`/api/bills/download/${packageId}?docType=pdf`}
										target="_blank"
										label="Download PDF"
									>
										<IconFileTypePdf class="w-8 h-8" />
									</LinkButton>,
								]}
							>
								<blockquote class="dark:prose-invert line-clamp-6 text-pretty">
									{title}
								</blockquote>
								<p class="text-gray-800 dark:text-gray-400 clear-left text-pretty">
									Date Issued:{" "}
									<span class="text-nowrap">
										{dayjs(dateIssued).format("dddd MMMM D, YYYY")}
									</span>
								</p>
								<p class="text-gray-800 dark:text-gray-400 clear-left text-pretty">
									Last Change:{" "}
									<span class="text-nowrap">
										{dayjs(lastModified).format("dddd MMMM D, YYYY")}
									</span>
								</p>
							</Card>
						</BillSummaryContextProvider>
					))}
				</div>
			</div>
		</>
	);
};

export { SearchResultsGrid };
