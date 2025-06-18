import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Footer, Header } from "components";

export default function App({ Component }: PageProps) {
	return (
		<html lang="en">
			<Head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta name="description" content="List of congressional bills by date"></meta>
				<title>WTF Is Congress Doing Now?</title>
				<link rel="preload" as="image" href="images/congress.jpg" />
				<link rel="stylesheet" href="styles.css" />
			</Head>
			<body class="min-h-screen flex flex-col">
				<Header />
				<main class="w-full h-full flex flex-col flex-grow bg-gradient-to-tr from-red-200 via-slate-100 to-blue-200">
					<Component />
				</main>
				<Footer />
			</body>
		</html>
	);
}
