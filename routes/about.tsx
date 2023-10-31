import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
	async GET(_req, ctx) {
		const resp = await ctx.render();
		resp.headers.set("X-Custom-Header", "Hello");
		return resp;
	},
};

export default function AboutPage() {
	return (
		<div class="py-8 flex flex-col justify-center relative overflow-hidden lg:py-12">
			<div class="mt-8 prose prose-slate mx-auto lg:prose-lg">
				<p class="lead">
					Created from a Deno Fresh tutorial project and expanded with DATA.GOV API's.
					Feel free to checkout the project on{" "}
					<a target="_blank" href="https://github.com/gibbygano/fresh">GitHub</a>.
				</p>
			</div>
		</div>
	);
}
