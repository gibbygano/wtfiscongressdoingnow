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
		<main>
			<span class="p-10 h-full flex items-center justify-center">
				<p>Created with Deno Fresh.</p>&nbsp;
				<p>
					<span class="font-bold">LOTS</span> of credit to Oscar Alfonso Guerrero, the creator of&nbsp;
					<link href="https://github.com/CarcajadaArtificial/lunchbox">
						Lunchbox
					</link>, a component library for Deno Fresh.
				</p>
			</span>
		</main>
	);
}
