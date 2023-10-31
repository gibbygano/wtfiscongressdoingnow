import { asset } from "$fresh/runtime.ts";

export default function Home() {
	return (
		<div class="py-8 flex flex-col justify-center relative overflow-hidden lg:py-12">
			<div class="mt-8 prose prose-slate mx-auto lg:prose-lg">
				<p class="lead">
					Welcome to my little Deno Fresh project! I've been using this as an opportunity to learn about Deno, Fresh, and improve my skills
					with React/Preact. Feel free to look around and checkout the repo on GitHub (see about page). 
				</p>
			</div>
		</div>
	);
}
