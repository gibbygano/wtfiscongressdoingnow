import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import dayjs from "dayjs";
import "humanizer";
import { Card, LinkButton } from "components/shared";
import { BillSummaryAccordion } from "islands";
import { CongressionalBills } from "types";
import { cx } from "twind";
import { onEvent } from "DOMEventHandlers";

export default (
	{ packages }: CongressionalBills,
) => {
	return (
		<>
			<div class="pb-10 flex-1">
				<div
					class="columns-1 text-xs gap-5 px-7 pt-10 relative
						   md:(columns-2,text-sm,group/cards)
						   lg:(columns-3,text-base)
						   xl:columns-4 
						   2xl:columns-6"
					id="bills"
				>
					{packages.map((
						{ packageId, lastModified, dateIssued, title, docClass, congress },
					) => (
						<Card
							onClose={(e) =>
								onEvent(e, () => (document.activeElement as HTMLElement)?.blur())}
							className={cx(
								`md:(focus-within:(fixed,z-[1],inset-x-0,top-16,mx-auto,max-h-screen-sm,max-w-screen-sm,scale-[.80])) 
								 md:([&:not(:focus-within)]:(group-focus-within/cards:(opacity-30))))
								 2xl:(focus-within:(top-28,scale-100)) 
								 transition-transform ease-in-out duration-700`,
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
