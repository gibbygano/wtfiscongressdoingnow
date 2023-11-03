import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "components";

export default function App({ Component }: AppProps) {
	return (
		<html>
			<Head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>WTF Is Congress Doing Now?</title>
			</Head>
			<body>
				<Header />
				<div class="w-full h-full">
					<main class="w-full flex-grow pt-2 pl-2 bg-gray-50 min-h-screen pr-2">
						<Component />
					</main>
				</div>
			</body>
		</html>
	);
}
