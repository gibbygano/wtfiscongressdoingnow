import { RouteContext } from "$fresh/server.ts";

interface GitHubResponse {
	login: string;
	name: string;
	avatar_url: string;
}

export default async function Page(_req: Request, ctx: RouteContext) {
	const resp = await fetch(
		`https://api.github.com/users/${ctx.params.username}`,
	);

	if (!resp.ok) {
		console.log(resp);
		return <h1>An Error occurred</h1>;
	}

	const { login, name, avatar_url } = (await resp.json()) as GitHubResponse;

	return (
		<main class="h-full flex items-center justify-center">
			<a
				target="_blank"
				href={`https://github.com/${ctx.params.username}`}
			>
				<img src={avatar_url} width={64} height={64} />
				<h1>{name}</h1>
				<p>{login}</p>
			</a>
		</main>
	);
}
