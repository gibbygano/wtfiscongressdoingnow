import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/book.tsx";
import IconUsersGroup from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/users-group.tsx";
import { Badge, Status } from "components";
import { onEvent } from "DOMEventHandlers";
import { useFetchBillSummary } from "hooks";
import GroupedAccordion from "../components/shared/GroupedAccordion.tsx";
import { Member, Reference } from "types";

type Props = {
	packageId: string;
};

export default ({ packageId }: Props) => {
	const openSectionId = useSignal<string | null>(null);

	const { billSummary: { members, references }, loading, error } = useFetchBillSummary(
		packageId,
		openSectionId.value !== null,
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
	const sponsorSectionId = `${packageId}-sponsors`;
	const referenceSectionId = `${packageId}-references`;

	const sections = [{
		title: "Sponsors",
		icon: <IconUsersGroup class="w-6 h-6" />,
		contents: sponsorsContent(members, error, loading),
		sectionId: sponsorSectionId,
		onExpand: (e: JSX.TargetedEvent<Element, Event>) =>
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
		onExpand: (e: JSX.TargetedEvent<Element, Event>) =>
			onEvent(e, () => {
				if (openSectionId.value !== referenceSectionId) {
					openSectionId.value = referenceSectionId;
				} else {
					openSectionId.value = null;
				}
			}),
	}];

	return <GroupedAccordion openSectionId={openSectionId} sections={sections} />;
};
