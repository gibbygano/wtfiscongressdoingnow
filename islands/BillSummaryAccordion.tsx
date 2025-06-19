import { useComputed, useSignal } from "@preact/signals";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/book.tsx";
import IconUsersGroup from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/users-group.tsx";
import IconFileStack from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-stack.tsx";
import dayjs from "dayjs";
import { Badge, GroupedAccordionDetails, Status } from "components";
import { useFetchActions, useFetchBillSummary } from "hooks";
import type { Action, CongressionalBillSummary } from "types";
import _ from "npm:lodash";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const openSection = useSignal<HTMLDetailsElement | null>(null);
	const billSummary = useSignal<CongressionalBillSummary>();
	const actions = useSignal<Array<Action>>([]);
	const uniqueActions = useComputed<Array<Action>>(() =>
		_.uniqWith(
			actions.value,
			(arrVal: Action, othVal: Action) =>
				arrVal.text === othVal.text && arrVal.type === othVal.type &&
				arrVal.actionDate === othVal.actionDate,
		)
	);

	const sponsorSectionId = `${packageId}-sponsors`;
	const referenceSectionId = `${packageId}-references`;
	const actionSectionId = `${packageId}-actions`;
	const billIds = packageId.match("(\\d+)([a-z]+)(\\d+)([a-z]+)$") as RegExpMatchArray;

	const { loading, error } = useFetchBillSummary(
		packageId,
		billSummary,
		openSection.value != null,
	);

	const members = billSummary.value?.members;
	const references = billSummary.value?.references;
	const { error: actionsError, loading: actionsLoading } = useFetchActions(
		billIds[1],
		billIds[2],
		billIds[3],
		actions,
		openSection.value?.getAttribute("id") === actionSectionId,
	);

	return (
		<div>
			<GroupedAccordionDetails
				openSection={openSection}
				packageId={packageId}
				title="Sponsors"
				icon={<IconUsersGroup class="w-6 h-6" />}
				sectionId={sponsorSectionId}
			>
				<Status error={error} loading={loading}>
					<div class="prose prose-slate dark:prose-invert mb-5">
						{members && !loading
							? members.map((m) => (
								<>
									<p>
										{m.memberName} - {m.party} {m.state}
										<br />
										<Badge role={m.role} />
									</p>
								</>
							))
							: <p>No sponsers, check back later.</p>}
					</div>
				</Status>
			</GroupedAccordionDetails>
			<GroupedAccordionDetails
				openSection={openSection}
				packageId={packageId}
				title="References"
				icon={<IconBook class="w-6 h-6" />}
				sectionId={referenceSectionId}
			>
				<Status error={error} loading={loading}>
					<div class="prose prose-slate dark:prose-invert mb-5">
						<ul>
							{references && !loading
								? references.map((r) => (
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
								))
								: <p>No references, check back later.</p>}
						</ul>
					</div>
				</Status>
			</GroupedAccordionDetails>
			<GroupedAccordionDetails
				openSection={openSection}
				packageId={packageId}
				title="Actions"
				icon={<IconFileStack class="w-6 h-6" />}
				sectionId={actionSectionId}
			>
				<Status error={actionsError} loading={actionsLoading}>
					<div class="prose prose-slate dark:prose-invert mb-5">
						{uniqueActions.value
							? uniqueActions.value.map(({ actionDate, text }: Action) => (
								<>
									<p class="border-b font-bold">
										{dayjs(actionDate).format("dddd MMMM D, YYYY")}
									</p>
									<p>{text}</p>
								</>
							))
							: <p>No actions, check back later.</p>}
					</div>
				</Status>
			</GroupedAccordionDetails>
		</div>
	);
};
