import Agency from "./Agency.ts";

export default interface ExecutiveOrder {
	title: string;
	type: string;
	abstract?: string;
	document_number: string;
	html_url: URL;
	pdf_url: URL;
	public_inspection_pdf_url: URL;
	publication_date: Date;
	agencies: Array<Agency>;
	excerpts?: string;
}
