import useFetchBillSummary from "/hooks/useFetchBillSummary.ts";
import { Accordion, Error, Loading } from "components";
import "humanizer";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";

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

	const { billSummary: { members, originChamber, congress }, loading, error } =
		useFetchBillSummary(
			packageId,
			accordionIsOpen.value,
		);

	const onSummaryExpand = (e: JSX.TargetedEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const accordionItem = document.getElementById(`summary-${packageId}`);
		const maxHeight = "max-h-52";
		const padding = "p-4";

		accordionIsOpen.value = !accordionIsOpen.value;

		accordionItem?.classList.toggle(maxHeight);
		accordionItem?.classList.toggle(padding);
	};

	return (
		<Accordion title="Summary" onSummaryExpand={onSummaryExpand} id={`summary-${packageId}`}>
			{error?.name
				? <Error>{error.message}</Error>
				: loading
				? <Loading>Loading Bill Summary...</Loading>
				: (
					<article class="prose mb-5">
						<h5>Origin: {originChamber} - {congress.ordinalize()} Congress</h5>
						<br />
						{members.map((m) => (
							<p>
								{m.role}: {m.memberName} - {m.party} {m.state}
							</p>
						))}
					</article>
				)}
		</Accordion>
	);
};
