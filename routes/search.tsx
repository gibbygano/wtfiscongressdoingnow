import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../islands/Button.tsx";
import Input from "../islands/Input.tsx";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
	results: string[];
	query: string;
}

export const handler: Handlers<Data> = {
	GET(req, ctx) {
		const url = new URL(req.url);
		const query = url.searchParams.get("q") || "";
		const results = NAMES.filter((name) => name.includes(query));
		return ctx.render({ results, query });
	},
};

export default function Page({ data }: PageProps<Data>) {
	return (
		<>
			<form>
				<Input type="text" name="q" value={data.query} />
				<Button type={"submit"}>Search</Button>
			</form>
			<ul>
				{data.results.map((name) => <li key={name}>{name}</li>)}
			</ul>
		</>
	);
}
