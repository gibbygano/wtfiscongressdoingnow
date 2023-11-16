import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import dayjs from "dayjs";
import "humanizer";
import { Card, LinkButton } from "components";
import { BillSummaryAccordion } from "islands";
import { CongressionalBills } from "types";
import { cx } from "twind";

export default (
	{ packages }: CongressionalBills,
) => {
	return (
		<>
			<div class="pb-10 flex-1">
				<div
					class="relative lg:columns-3 xl:columns-6 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10 md:group"
					id="bills"
				>
					{packages.map((
						{ packageId, lastModified, dateIssued, title, docClass, congress },
					) => (
						<Card
							className={cx(
								"md:(focus-within:(fixed,z-[1],inset-x-0,top-28,mx-auto,max-h-fit,max-w-screen-sm)) transition-transform duration-700 md:([&:not(:focus-within)]:(group-focus-within:(opacity-30))))",
							)}
							key={packageId}
							headerText={title}
							backdrop-blur-lg
							actionChildren={[
								<BillSummaryAccordion packageId={packageId} />,
								<LinkButton
									className="mt-7"
									href={`/api/bills/download/${packageId}?docType=pdf`}
									target="_blank"
								>
									<IconFileTypePdf class="w-8 h-8" />
								</LinkButton>,
							]}
						>
							<p class="mt-1 text-lg text-gray-800 dark:text-gray-400 clear-left font-bold">
								{docClass.toUpperCase()}{" "}
								{packageId.split(docClass)[1].match("\\d+")} -{" "}
								{congress.ordinalize()} Congress
							</p>
							<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
								Date Issued: {dayjs(dateIssued).format("dddd MMMM D, YYYY")}
							</p>
							<p class="mt-1 text-gray-800 dark:text-gray-400 clear-left">
								Last Change: {dayjs(lastModified).format("dddd MMMM D, YYYY")}
							</p>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};
