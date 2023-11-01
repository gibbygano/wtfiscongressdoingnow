import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Navigation from "../components/Navigation.tsx";

export default function App({ Component }: AppProps) {
	return (
		<html>
			<Head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>RJB-FRESH</title>
			</Head>
			<body>
				<div class="w-full h-full grid grid-cols-7 lg:grid-cols-10">
					<Navigation />
					<main class="w-full flex-grow pt-2 pl-2 col-end-8 lg:col-end-11 col-span-6 lg:col-span-8 bg-gray-50 min-h-screen pr-2">
						<Component />
					</main>
				</div>
			</body>
		</html>
	);
}
