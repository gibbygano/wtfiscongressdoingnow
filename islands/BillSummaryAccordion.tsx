import { useSignal } from "@preact/signals";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/book.tsx";
import IconUsersGroup from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/users-group.tsx";
import IconFileStack from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-stack.tsx";
import dayjs from "dayjs";
import { Badge, GroupedAccordionDetails, Status } from "components";
import { useFetchActions, useFetchBillSummary } from "hooks";
import type { Action, Member, Reference } from "types";
import _ from "npm:lodash";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const sponsors = useSignal<Array<Member>>();
	const references = useSignal<Array<Reference>>();
	const cardHasInteraction = useSignal<boolean>(false);
	const actions = useSignal<Array<Action>>();

	const sponsorSectionId = `${packageId}-sponsors`;
	const referenceSectionId = `${packageId}-references`;
	const actionSectionId = `${packageId}-actions`;

	const { loading, error } = useFetchBillSummary(
		packageId,
		(billSummary) => {
			sponsors.value = billSummary.members;
			references.value = billSummary.references;
		},
		cardHasInteraction.value && (!references.value && !sponsors.value),
	);

	const billIds = packageId.match("(\\d+)([a-z]+)(\\d+)([a-z]+)$") as RegExpMatchArray;
	const { error: actionsError, loading: actionsLoading } = useFetchActions(
		billIds[1],
		billIds[2],
		billIds[3],
		(responseObject) =>
			actions.value = _.uniqWith(
				responseObject,
				(arrVal: Action, othVal: Action) =>
					arrVal.text === othVal.text && arrVal.type === othVal.type &&
					arrVal.actionDate === othVal.actionDate,
			),
		cardHasInteraction.value && !actions.value,
	);

	return (
		<div onFocusInCapture={() => cardHasInteraction.value = true}>
			<GroupedAccordionDetails
				packageId={packageId}
				title="Sponsors"
				icon={<IconUsersGroup class="w-6 h-6" />}
				sectionId={sponsorSectionId}
			>
				<Status error={error} loading={loading}>
					<div class="prose prose-slate dark:prose-invert mb-5">
						{sponsors.value
							? sponsors.value.map(({ memberName, party, state, role }) => (
								<p>
									{memberName} - {party} {state}
									<br />
									<Badge role={role} />
								</p>
							))
							: <p>No sponsers, check back later.</p>}
					</div>
				</Status>
			</GroupedAccordionDetails>
			<GroupedAccordionDetails
				packageId={packageId}
				title="References"
				icon={<IconBook class="w-6 h-6" />}
				sectionId={referenceSectionId}
			>
				<Status error={error} loading={loading}>
					<div class="prose prose-slate dark:prose-invert mb-5 ml-7">
						{references.value
							? references.value.map(({ contents }) => (
								<ul class="pl-2.5">
									{contents.map(({ title, label, sections }) => (
										<li>
											<span class="whitespace-nowrap">
												{title} {label}
											</span>&nbsp;
											<ul class="pl-2.5">
												{sections &&
													sections.map((section) => (
														<li>
															<a
																target="_blank"
																href={`https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title${title}-section${section}&num=0&edition=prelim`}
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
					</div>
				</Status>
			</GroupedAccordionDetails>
			<GroupedAccordionDetails
				packageId={packageId}
				title="Actions"
				icon={<IconFileStack class="w-6 h-6" />}
				sectionId={actionSectionId}
			>
				<Status error={actionsError} loading={actionsLoading}>
					<div class="prose prose-slate dark:prose-invert mb-5">
						{actions.value
							? actions.value.map(({ actionDate, text }: Action) => (
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
