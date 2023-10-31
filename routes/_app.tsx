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
			<body class="clr-bg-panel clr-txt-base txt-paragraph">
				<div class="w-full h-full grid grid-cols-5 _screen">
					<Navigation />
					<main class="w-full flex-grow pt-1 col-span-4 bg-gray-50 min-h-screen">
						<Component />
					</main>
				</div>
			</body>
		</html>
	);
}
