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
				<link crossOrigin="use-credentials" rel="manifest" href="manifest.json" />
				<title>WTF Is Congress Doing Now?</title>
			</Head>
			<body>
				<Header />
				<div class="w-full h-full">
					<main class="w-full flex-grow bg-gradient-to-tr from-red-200 via-slate-100 to-blue-200 min-h-screen">
						<Component />
					</main>
				</div>
			</body>
		</html>
	);
}
