import { Accordion, Badge, Error, Loading } from "components";
import "humanizer";
import { useSignal } from "@preact/signals";
import { onEvent } from "DOMEventHandlers";
import { useFetchBillSummary } from "hooks";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const accordionIsOpen = useSignal(false);

	const { billSummary: { members, originChamber, congress, references }, loading, error } =
		useFetchBillSummary(
			packageId,
			accordionIsOpen.value,
		);

	return (
		<Accordion
			title="Summary"
			onExpand={(e) =>
				onEvent(e, () => {
					accordionIsOpen.value = !accordionIsOpen.value;
				})}
			id={`summary-${packageId}`}
			isOpen={accordionIsOpen.value}
		>
			{error?.name
				? <Error>{error.message}</Error>
				: loading
				? <Loading>Loading Bill Summary...</Loading>
				: (
					<div class="prose prose-slate dark:prose-invert mb-5">
						<p>
							Origin: {originChamber} - {congress.ordinalize()} Congress
						</p>
						{members && members.map((m) => (
							<>
								<p>
									{m.memberName} - {m.party} {m.state}
									<br />
									<Badge badgeType={m.role} />
								</p>
							</>
						))}
						{references && (
							<>
								<p>References:</p>
								<ul class="pl-">
									{references.map((r) => (
										<ul class="pl-2.5">
											{r.contents.map((c) => (
												<li>
													<span class="whitespace-nowrap">
														{c.title && c.title} {c.label && c.label}
													</span>&nbsp;
													<ul class="pl-2.5">
														{c.sections &&
															c.sections.map((section) => (
																<li>
																	<a
																		target="_blank"
																		href={`https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title${c.title}-section${section}&num=0&edition=prelim`}
																	>
																		§{section}
																	</a>
																	&nbsp;
																</li>
															))}
													</ul>
												</li>
											))}
										</ul>
									))}
								</ul>
							</>
						)}
					</div>
				)}
		</Accordion>
	);
};
