import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Navigation from "../components/Navigation.tsx";
import Sidebar from "../components/Sidebar.tsx";


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
					<main class="w-full flex-grow pt-1 px-3 md:col-span-3 col-span-4 ">
						<Component />
					</main>
					<Sidebar />
				</div>
				<footer class="bg-black mt-auto">
				</footer>
			</body>
		</html>
	);
}
