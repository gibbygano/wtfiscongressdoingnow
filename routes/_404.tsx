import { Head } from "$fresh/runtime.ts";

export default function Error404() {
	return (
		<>
			<Head>
				<title>404 - Page not found</title>
			</Head>
			<div class="px-4 py-8 mx-auto">
				<div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
					<img
						loading="lazy"
						class="my-6"
						src="/images/fine.gif"
						width="128"
						height="128"
						alt="This is fine..."
					/>
					<h1 class="text-4xl font-bold">404 - This is fine...</h1>
					<p class="my-4">
						The page you were looking for doesn't exist.
					</p>
					<a href="/" class="underline">Go back home</a>
				</div>
			</div>
		</>
	);
}
