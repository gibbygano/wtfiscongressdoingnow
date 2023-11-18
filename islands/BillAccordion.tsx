import { computed, useSignal } from "@preact/signals";
import IconAlignJustified from "fresh-icons/align-justified.tsx";
import IconBook from "fresh-icons/book.tsx";
import IconUsersGroup from "fresh-icons/users-group.tsx";
import IconFileStack from "fresh-icons/file-stack.tsx";
import dayjs from "dayjs";
import { onEvent } from "DOMEventHandlers";
import { useFetchActions, useFetchBillSummary, useFetchTextVersions } from "hooks";
import {
	Badge,
	GroupedAccordion,
	GroupedAccordionButton,
	GroupedAccordionContent,
	GroupedAccordionGroup,
	LinkButton,
	Status,
} from "components/shared";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const openSectionId = useSignal<string | null>(null);
	const isOpen = computed<Record<string, boolean>>(
		() => {
			return {
				"sponsors": "sponsors" === openSectionId.value,
				"references": "references" === openSectionId.value,
				"actions": "actions" === openSectionId.value,
				"fullText": "fullText" === openSectionId.value,
			};
		},
	);

	const { billSummary: { members, references }, loading, error } = useFetchBillSummary(
		packageId,
		openSectionId.value !== null,
	);

	// This sucks, but if the summary fetch hasn't completed (or even been called) yet, we don't have the
	// values we need to call the other API's. So we split apart the package Id which DOES contain the information
	// we need, just bottled up.
	const billIds = packageId.match("(\\d+)([a-z]+)(\\d+)([a-z]+)$") as RegExpMatchArray;
	const { actions, error: actionsError, loading: actionsLoading } = useFetchActions(
		billIds[1],
		billIds[2],
		billIds[3],
		isOpen.value["actions"],
	);
	const { textVersions, error: textsError, loading: textsLoading } = useFetchTextVersions(
		billIds[1],
		billIds[2],
		billIds[3],
		isOpen.value["fullText"],
	);

	const accordionButtonClick = (sectionId: string) => {
		if (openSectionId.value !== sectionId) {
			openSectionId.value = sectionId;
		} else {
			openSectionId.value = null;
		}
	};

	return (
		<GroupedAccordion>
			<GroupedAccordionGroup first open={isOpen.value["sponsors"]}>
				<GroupedAccordionButton
					onClick={(e) => onEvent(e, () => accordionButtonClick("sponsors"), true)}
				>
					<IconUsersGroup class="w-6 h-6" />&nbsp;Sponsors
				</GroupedAccordionButton>
				<GroupedAccordionContent>
					<Status error={error} loading={loading}>
						<div class="prose prose-slate dark:prose-invert mb-5 shadow-inner">
							{members
								? members.map((m) => (
									<>
										<p>
											{m.memberName} - {m.party} {m.state}
											<br />
											<Badge badgeType={m.role} />
										</p>
									</>
								))
								: <p>No sponsers, check back later.</p>}
						</div>
					</Status>
				</GroupedAccordionContent>
			</GroupedAccordionGroup>
			<GroupedAccordionGroup open={isOpen.value["references"]}>
				<GroupedAccordionButton
					onClick={(e) => onEvent(e, () => accordionButtonClick("references"), true)}
				>
					<IconBook class="w-6 h-6" />&nbsp;References
				</GroupedAccordionButton>
				<GroupedAccordionContent>
					<Status error={error} loading={loading}>
						<div class="prose prose-slate dark:prose-invert mb-5 shadow-inner">
							<ul>
								{references
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
				</GroupedAccordionContent>
			</GroupedAccordionGroup>
			<GroupedAccordionGroup open={isOpen.value["actions"]}>
				<GroupedAccordionButton
					onClick={(e) => onEvent(e, () => accordionButtonClick("actions"), true)}
				>
					<IconFileStack class="w-6 h-6" />&nbsp;Actions
				</GroupedAccordionButton>
				<GroupedAccordionContent>
					<Status error={actionsError} loading={actionsLoading}>
						<div class="prose prose-slate dark:prose-invert mb-5 shadow-inner">
							{actions
								? actions.map(({ actionDate, text }) => (
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
				</GroupedAccordionContent>
			</GroupedAccordionGroup>
			<GroupedAccordionGroup open={isOpen.value["fullText"]} last>
				<GroupedAccordionButton
					onClick={(e) => onEvent(e, () => accordionButtonClick("fullText"), true)}
				>
					<IconAlignJustified class="w-6 h-6" />&nbsp;Full Text Versions
				</GroupedAccordionButton>
				<GroupedAccordionContent>
					<Status error={textsError} loading={textsLoading}>
						<div class="prose prose-slate dark:prose-invert mb-5 hover:divide-y hover:divide-double shadow-inner">
							{textVersions?.length > 0
								? textVersions.map(({ date, formats, type }) => (
									<div className="pb-5 flex flex-col">
										<p class="mb-1">
											{dayjs(date).format("dddd MMMM D, YYYY")}
										</p>
										<p class="font-bold mt-0">{type}</p>
										{formats?.length > 0 &&
											formats.map(({ type, url }) => (
												<LinkButton
													className="no-underline"
													href={url}
													target="_blank"
												>
													{type}
												</LinkButton>
											))}
									</div>
								))
								: <p>No texts available, check back later.</p>}
						</div>
					</Status>
				</GroupedAccordionContent>
			</GroupedAccordionGroup>
		</GroupedAccordion>
	);
};
