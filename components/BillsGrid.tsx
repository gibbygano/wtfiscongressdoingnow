import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import dayjs from "dayjs";
import "humanizer/ordinalize.ts";
import { Card, LinkButton } from "components";
import { BillSummaryAccordion } from "islands";
import { CongressionalBills } from "types";
import { useSignal } from "@preact/signals";
import { onEvent } from "DOMEventHandlers";
import Modal from "./shared/Modal.tsx";

export default (
	{ packages }: CongressionalBills,
) => {
	const modalData = useSignal<{ packageId: string; docClass: string } | undefined>(
		undefined,
	);

	return (
		<>
			<div class="pb-10 flex-1 dark:backdrop-brightness-[.8]">
				<div
					class="lg:columns-3 2xl:columns-4 3xl:columns-5 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10"
					id="bills"
				>
					{packages.map((
						{ packageId, lastModified, dateIssued, title, docClass, congress },
					) => (
						<Card
							key={packageId}
							headerText={`${docClass.toUpperCase()} 
							${packageId.split(docClass)[1].match("\\d+")}`}
							actionChildren={[
								<BillSummaryAccordion packageId={packageId} />,
								<LinkButton
									className="mt-7"
									href={`/api/bills/download/${packageId}?docType=pdf`}
									target="_blank"
									onClick={(e) =>
										onEvent(e, () => {
											e.preventDefault();
											modalData.value = {
												packageId: packageId,
												docClass: docClass,
											};
										})}
								>
									<IconFileTypePdf class="w-8 h-8" />
								</LinkButton>,
							]}
						>
							<blockquote class="dark:prose-invert line-clamp-6 text-pretty">
								{title}
							</blockquote>
							<p class="text-gray-800 dark:text-gray-400 clear-left font-semibold">
								{congress.ordinalize()} Congress
							</p>
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
					))}
				</div>
			</div>
			{modalData.value !== undefined && (
				<Modal
					title={`${modalData.value.docClass.toUpperCase()} ${
						modalData.value.packageId.split(modalData.value.docClass)[1].match("\\d+")
					}`}
					onClose={(e) =>
						onEvent(e, () => {
							e.preventDefault();
							console.log(e, e.key);
							if (e.key === "Escape") {
								modalData.value = undefined;
							}
						})}
				>
					<object
						class="h-full w-full"
						data={`/api/bills/download/${modalData.value.packageId}?docType=pdf`}
					/>
				</Modal>
			)}
		</>
	);
};
