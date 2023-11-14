export default interface CongressionalBillSummary {
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
