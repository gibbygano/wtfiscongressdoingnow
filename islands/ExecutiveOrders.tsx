import { Card, LinkButton, Status } from "components";

import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import dayjs from "dayjs";
import { useExecutiveOrderContext } from "context";
import { useIntersectionObserver } from "hooks";

export default () => {
	const { executiveOrders, loading, error, pageSignal } = useExecutiveOrderContext();
	const { containerRef, isIntersecting } = useIntersectionObserver();
	if (isIntersecting && executiveOrders?.next_page_url) {
		pageSignal.value = new URL(executiveOrders.next_page_url).searchParams.get("page") ??
			pageSignal.value;
	}

	return (
		<Status loading={loading} error={error} fullscreen>
			<div class="flex-1 pb-16">
				<div
					class="lg:columns-3 2xl:columns-4 3xl:columns-5 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10"
					id="bills"
				>
					{executiveOrders?.results.map((
						{
							title,
							agencies,
							pdf_url,
							publication_date,
							document_number,
						},
					) => (
						<Card
							key={document_number}
							headerText={`${agencies[0].name} | ${document_number}`}
							actionChildren={[
								<LinkButton
									label="Download PDF"
									className="mt-7"
									href={pdf_url.toString()}
									target="_blank"
									key={document_number}
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
					))}
					{!loading &&
						(
							<span
								class="h-0 w-0 overflow-hidden opacity-0"
								ref={containerRef}
							/>
						)}
				</div>
			</div>
		</Status>
	);
};
