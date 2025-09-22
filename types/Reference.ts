export default interface Reference {
	contents: Array<{
		label: string;
		title: string;
		sections: Array<string>;
	}>;
}
