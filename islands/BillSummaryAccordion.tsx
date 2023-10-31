import useFetchBillSummary from "/hooks/useFetchBillSummary.ts";
import { Accordion, Badge, Error, Loading } from "components";
import "humanizer";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import c from "https://esm.sh/v128/@twind/preset-tailwind@1.1.4/denonext/baseTheme.js";

export interface BillSummary {
	originChamber: string;
	references: Array<{
		contents: Array<{
			label: string;
			title: string;
			sections: Array<string>;
		}>;
	}>;
	congress: string;
	session: string;
	detailsLink: string;
	shortTitle: Array<{
		type: string;
		title: string;
	}>;
	isPrivate: string;
	title: string;
	branch: string;
	isAppropriation: boolean;
	collectionName: string;
	download: {
		premisLink: string;
		xmlLink: string;
		txtLink: string;
		zipLing: string;
		modsLink: string;
		pdfLink: string;
	};
	pages: string;
	related: {
		billStatusLink: string;
	};
	relatedLink: string;
	members: Array<{
		role: string;
		chamber: string;
		congress: number;
		bioGuideId: string;
		memberName: string;
		state: string;
		party: string;
	}>;
	suDocClassNumber: string;
	dateIssued: string;
	currentChamber: string;
	billVersion: string;
	billType: string;
	packageId: string;
	collectionCode: string;
	governmentAuthor2: string;
	governmentAuthor1: string;
	publisher: string;
	docClass: string;
	lastModified: string;
	category: string;
	billNumber: number;
	otherIdentifier: {
		"migrated-doc-id": string;
		"parent-ils-system-id": string;
		"child-ils-title": string;
		"parent-ils-title": string;
		"child-ils-system-id": string;
		"stock-number": string;
	};
}

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

	const onSummaryExpand = (e: JSX.TargetedEvent<HTMLButtonElement>) => {
		e.preventDefault();

		accordionIsOpen.value = !accordionIsOpen.value;
	};

	return (
		<Accordion
			title="Summary"
			onExpand={onSummaryExpand}
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
									{m.memberName} - {m.party} {m.state}<br />
									<Badge badgeType={m.role} />
								</p>
							</>
						))}
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
					</div>
				)}
		</Accordion>
	);
};
