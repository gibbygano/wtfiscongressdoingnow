export default interface CongressionalBill {
	packageId: string;
	lastModified: Date;
	packageLink: URL;
	docClass: string;
	title: string;
	congress: number;
	dateIssued: Date;
}
