import { PageProps } from "https://jsr.io/@fresh/core/2.0.0-alpha.34/src/context.ts";
import { HttpError } from "https://jsr.io/@fresh/core/2.0.0-alpha.34/src/error.ts";

export default function ErrorPage(props: PageProps) {
	const error = props.error; // Contains the thrown Error or HTTPError
	const isHttpError = error instanceof HttpError;
	const errorStatusCode = isHttpError ? error.status : null;

	if (!isHttpError) {
		console.error(error);
	}

	return (
		<div class="px-4 py-8 mx-auto">
			<div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
				<img
					class="my-6"
					src="/images/fine.gif"
					width="128"
					height="128"
					alt="This is fine..."
				/>
				{(isHttpError && errorStatusCode === 404) &&
					(
						<div>
							<h1 class="text-4xl font-bold">404 - This is fine...</h1>
							<p class="my-4">
								The page you were looking for doesn't exist.
							</p>
							<a href="/" class="underline">Go back home</a>
						</div>
					)}
				{(!isHttpError || errorStatusCode === null) &&
					(
						<div>
							<h1 class="text-4xl font-bold">Oh no...</h1>
							<p class="my-4">
								There was an error. Please reload the page or try again later.
							</p>
							<a href="/" class="underline">Go back home</a>
						</div>
					)}
			</div>
		</div>
	);
}
