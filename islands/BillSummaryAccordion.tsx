import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import IconAlignJustified from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/align-justified.tsx";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/book.tsx";
import IconUsersGroup from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/users-group.tsx";
import IconFileStack from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-stack.tsx";
import dayjs from "dayjs";
import { Badge, LinkButton, Status } from "components";
import { onEvent } from "DOMEventHandlers";
import { useFetchActions, useFetchBillSummary, useFetchTextVersions } from "hooks";
import GroupedAccordion from "../components/shared/GroupedAccordion.tsx";
import { Action, Member, Reference, TextVersion } from "types";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const openSectionId = useSignal<string | null>(null);

	const sponsorSectionId = `${packageId}-sponsors`;
	const referenceSectionId = `${packageId}-references`;
	const actionSectionId = `${packageId}-actions`;
	const textSectionId = `${packageId}-summaries`;
	const billIds = packageId.match("(\\d+)([a-z]+)(\\d+)([a-z]+)$") as RegExpMatchArray;

	const { billSummary: { members, references }, loading, error } = useFetchBillSummary(
		packageId,
		openSectionId.value !== null,
	);
	const { actions, error: actionsError, loading: actionsLoading } = useFetchActions(
		billIds[1],
		billIds[2],
		billIds[3],
		openSectionId.value === actionSectionId,
	);
	const { textVersions, error: textsError, loading: textsLoading } = useFetchTextVersions(
		billIds[1],
		billIds[2],
		billIds[3],
		openSectionId.value === textSectionId,
	);

	const sponsorsContent = (data: Array<Member>, error: Error | null, loading: boolean) => {
		return (
			<Status error={error} loading={loading}>
				<div class="prose prose-slate dark:prose-invert mb-5 shadow-inner">
					{data
						? data.map((m) => (
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
		);
	};

	const referencesContent = (data: Array<Reference>, error: Error | null, loading: boolean) => {
		return (
			<Status error={error} loading={loading}>
				<div class="prose prose-slate dark:prose-invert mb-5 shadow-inner">
					<ul>
						{data
							? data.map((r) => (
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
		);
	};

	const actionsContent = (
		data: Array<Action>,
		actionsError: Error | null,
		actionsLoading: boolean,
	) => (
		<Status error={actionsError} loading={actionsLoading}>
			<div class="prose prose-slate dark:prose-invert mb-5 shadow-inner">
				{data
					? data.map(({ actionDate, text }) => (
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
	);

	const textsContent = (
		data: Array<TextVersion>,
		actionsError: Error | null,
		actionsLoading: boolean,
	) => (
		<Status error={actionsError} loading={actionsLoading}>
			<div class="prose prose-slate dark:prose-invert mb-5 hover:divide-y hover:divide-double shadow-inner">
				{data?.length > 0
					? data.map(({ date, formats, type }) => (
						<div className="pb-5 flex flex-col">
							<p class="mb-1">
								{dayjs(date).format("dddd MMMM D, YYYY")}
							</p>
							<p class="font-bold mt-0">{type}</p>
							{formats?.length > 0 &&
								formats.map(({ type, url }) => (
									<LinkButton className="no-underline" href={url} target="_blank">
										{type}
									</LinkButton>
								))}
						</div>
					))
					: <p>No texts available, check back later.</p>}
			</div>
		</Status>
	);

	const sections = [{
		title: "Sponsors",
		icon: <IconUsersGroup class="w-6 h-6" />,
		contents: sponsorsContent(members, error, loading),
		sectionId: sponsorSectionId,
		onExpand: (e: JSX.TargetedEvent<HTMLButtonElement, Event>) =>
			onEvent(e, () => {
				if (openSectionId.value !== sponsorSectionId) {
					openSectionId.value = sponsorSectionId;
				} else {
					openSectionId.value = null;
				}
			}),
	}, {
		title: "References",
		icon: <IconBook class="w-6 h-6" />,
		contents: referencesContent(references, error, loading),
		sectionId: referenceSectionId,
		onExpand: (e: JSX.TargetedEvent<HTMLButtonElement, Event>) =>
			onEvent(e, () => {
				if (openSectionId.value !== referenceSectionId) {
					openSectionId.value = referenceSectionId;
				} else {
					openSectionId.value = null;
				}
			}),
	}, {
		title: "Actions",
		icon: <IconFileStack class="w-6 h-6" />,
		contents: actionsContent(actions, actionsError, actionsLoading),
		sectionId: actionSectionId,
		onExpand: (e: JSX.TargetedEvent<HTMLButtonElement, Event>) =>
			onEvent(e, () => {
				if (openSectionId.value !== actionSectionId) {
					openSectionId.value = actionSectionId;
				} else {
					openSectionId.value = null;
				}
			}),
	}, {
		title: "Full Text Versions",
		icon: <IconAlignJustified class="w-6 h-6" />,
		contents: textsContent(textVersions, textsError, textsLoading),
		sectionId: textSectionId,
		onExpand: (e: JSX.TargetedEvent<HTMLButtonElement, Event>) =>
			onEvent(e, () => {
				if (openSectionId.value !== textSectionId) {
					openSectionId.value = textSectionId;
				} else {
					openSectionId.value = null;
				}
			}),
	}];

	return <GroupedAccordion openSectionId={openSectionId} sections={sections} />;
};
