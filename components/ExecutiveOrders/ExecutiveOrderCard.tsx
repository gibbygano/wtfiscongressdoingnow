import { Card, LinkButton } from "components/shared";
import dayjs from "dayjs";
import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import type { ExecutiveOrder } from "types";

const ExecutiveOrderCard = (
	{ document_number, agencies, title, publication_date, pdf_url }: ExecutiveOrder,
) => {
	return (
		<Card
			key={`${document_number}-card`}
			headerText={`${agencies[0].name} | ${document_number}`}
			actionChildren={[
				<LinkButton
					label="Download PDF"
					className="mt-7"
					href={pdf_url.toString()}
					target="_blank"
					key={`${document_number}-pdfLink`}
				>
					<IconFileTypePdf class="w-8 h-8" />
				</LinkButton>,
			]}
		>
			<blockquote class="dark:prose-invert line-clamp-6 text-pretty">
				{title}
			</blockquote>
			<p class="text-gray-800 dark:text-gray-400 clear-left text-pretty">
				Publication Date:{" "}
				<span class="text-nowrap">
					{dayjs(publication_date).format("dddd MMMM D, YYYY")}
				</span>
			</p>
		</Card>
	);
};

export { ExecutiveOrderCard };
