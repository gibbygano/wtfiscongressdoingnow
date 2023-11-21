import { useSignal } from "@preact/signals";
import useFetch from "./useFetch.ts";
import { CongressionalBillSummary } from "types";

const useFetchBillSummary = (
	packageId: string,
	summaryAccordionIsOpen: boolean,
) => {
	const billSummary = useSignal<CongressionalBillSummary>({
		originChamber: "",
		references: [{
			contents: [{
				label: "",
				title: "",
				sections: [],
			}],
		}],
		congress: "",
		session: "",
		detailsLink: "",
		shortTitle: [{
			type: "",
			title: "",
		}],
		isPrivate: "",
		title: "",
		branch: "",
		isAppropriation: false,
		collectionName: "",
		download: {
			premisLink: "",
			xmlLink: "",
			txtLink: "",
			zipLing: "",
			modsLink: "",
			pdfLink: "",
		},
		pages: "",
		related: {
			billStatusLink: "",
		},
		relatedLink: "",
		members: [{
			role: "",
			chamber: "",
			congress: 118,
			bioGuideId: "",
			memberName: "",
			state: "",
			party: "",
		}],
		suDocClassNumber: "",
		dateIssued: "",
		currentChamber: "",
		billVersion: "",
		billType: "",
		packageId: "",
		collectionCode: "",
		governmentAuthor2: "",
		governmentAuthor1: "",
		publisher: "",
		docClass: "",
		lastModified: "",
		category: "",
		billNumber: "",
		otherIdentifier: {
			"migrated-doc-id": "",
			"parent-ils-system-id": "",
			"child-ils-title": "",
			"parent-ils-title": "",
			"child-ils-system-id": "",
			"stock-number": "",
		},
	});

	if (!summaryAccordionIsOpen) {
		return { billSummary: billSummary.value, loading: false, error: null };
	}

	const { data, error, loading, status, statusText } = useFetch<CongressionalBillSummary>(
		`/api/bills/summary/${packageId}`,
		undefined,
	);

	if (data) {
		billSummary.value = data;
	}

	return { billSummary: billSummary.value, error, loading };
};

export default useFetchBillSummary;
