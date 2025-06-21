import IconFileTypePdf from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-type-pdf.tsx";
import dayjs from "dayjs";
import { useSignal } from "@preact/signals";
import { Card, LinkButton, Status } from "components";
import { useFetchExecutiveOrders, useIntersectionObserver } from "hooks";
import type { ExecutiveOrders } from "types";

export default () => {
	const executiveOrders = useSignal<ExecutiveOrders>();
	const page = useSignal("1");

	const { containerRef, isIntersecting } = useIntersectionObserver();
	const { loading, error } = useFetchExecutiveOrders(
		(responseObject) => {
			executiveOrders.value = {
				results: executiveOrders.value
					? [...executiveOrders.value?.results, ...responseObject.results]
					: responseObject.results,
				description: responseObject.description,
				next_page_url: responseObject.next_page_url,
				count: responseObject.count,
				total_pages: responseObject.total_pages,
			};
		},
		page.value,
	);

	if (isIntersecting && executiveOrders.value?.next_page_url) {
		page.value = new URL(executiveOrders.value.next_page_url).searchParams.get("page") ??
			page.value;
	}

	return (
		<Status loading={loading} error={error} fullscreen>
			<div class="flex-1 pb-16 dark:backdrop-brightness-[.8]">
				<div
					class="lg:columns-3 2xl:columns-4 3xl:columns-5 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10"
					id="bills"
				>
					{executiveOrders.value?.results.map((
						{
							title,
							agencies,
							type,
							html_url,
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
