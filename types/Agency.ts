export default interface Agency {
	raw_name: string;
	name: string;
	id: number;
	url: URL;
	json_url: URL;
	parent_id?: number;
	slug: string;
}
