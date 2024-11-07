import { useComputed, useSignal } from "@preact/signals";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/book.tsx";
import IconUsersGroup from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/users-group.tsx";
import IconFileStack from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-stack.tsx";
import IconNews from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/news.tsx";
import { parseFeed } from "jsr:@mikaelporttila/rss@*";
import dayjs from "dayjs";
import { Badge, GroupedAccordion, Status } from "components";
import { useFetchActions, useFetchBillSummary } from "hooks";
import {
	Action,
	CongressionalBillSummary,
	CongressionalBillSummaryDefault,
	Member,
	Reference,
} from "types";
import _ from "npm:lodash";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const openSection = useSignal<HTMLDetailsElement | null>(null);
	const billSummary = useSignal<CongressionalBillSummary>(CongressionalBillSummaryDefault);
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
	const newsSectionId = `${packageId}-news`;
	const billIds = packageId.match("(\\d+)([a-z]+)(\\d+)([a-z]+)$") as RegExpMatchArray;

	const { loading, error } = useFetchBillSummary(
		packageId,
		billSummary,
		openSection.value !== null,
	);

	const { error: actionsError, loading: actionsLoading } = useFetchActions(
		billIds[1],
		billIds[2],
		billIds[3],
		actions,
		openSection.value?.getAttribute("id") === actionSectionId,
	);

	const sponsorsContent = (data: Array<Member>, error: Error | null, loading: boolean) => {
		return (
			<Status error={error} loading={loading}>
				<div class="prose prose-slate dark:prose-invert mb-5">
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
				<div class="prose prose-slate dark:prose-invert mb-5">
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
		actionsError: Error | null,
		actionsLoading: boolean,
	) => (
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
	);

	const newsContent = () => (
		<iframe
			src={`//rss.bloople.net/?url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D%2522${
				billIds[2]
			}%2B${billIds[3]}%2522%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen&showtitle=false&type=html`}
		>
		</iframe>
	);

	const sections = [{
		title: "Sponsors",
		icon: <IconUsersGroup class="w-6 h-6" />,
		contents: sponsorsContent(billSummary.value.members, error, loading),
		sectionId: sponsorSectionId,
	}, {
		title: "References",
		icon: <IconBook class="w-6 h-6" />,
		contents: referencesContent(billSummary.value.references, error, loading),
		sectionId: referenceSectionId,
	}, {
		title: "Actions",
		icon: <IconFileStack class="w-6 h-6" />,
		contents: actionsContent(actionsError, actionsLoading),
		sectionId: actionSectionId,
	}, {
		title: "News",
		icon: <IconNews class="w-6 h-6" />,
		contents: newsContent(),
		newsSectionId: newsSectionId,
	}];

	return (
		<GroupedAccordion
			openSection={openSection}
			packageId={packageId}
			sections={sections}
		/>
	);
};
