export default interface TextVersion {
	date: string;
	formats: Array<{
		type: string;
		url: string;
	}>;
	type: string;
}
