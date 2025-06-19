import { type Member, Role } from "./Member.ts";
import type Reference from "./Reference.ts";

interface CongressionalBillSummary {
	originChamber: string;
	references: Array<Reference>;
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
	members: Array<Member>;
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
	billNumber: string;
	otherIdentifier: {
		"migrated-doc-id": string;
		"parent-ils-system-id": string;
		"child-ils-title": string;
		"parent-ils-title": string;
		"child-ils-system-id": string;
		"stock-number": string;
	};
}

const defaultProps: CongressionalBillSummary = {
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
		role: Role.NONE,
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
};

export { type CongressionalBillSummary, defaultProps };
