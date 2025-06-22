import { PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { Footer, Header } from "components";

const App = ({ Component }: PageProps) => (
	<html lang="en">
		<Head>
			<meta charset="utf-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta property="og:title" content="WTF Is Congress Doing Now?" />
			<meta property="og:image" content="https://wtfiscongressdoingnow.us/images/seal.png" />
			<meta
				property="og:description"
				content="Keep up with what congress is doing. Now fortified with v orders! Powered by Congress.gov and GovInfo."
			/>
			<title>WTF Is Congress Doing Now?</title>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				rel="preload"
				as="image"
				// @ts-ignore - fetchpriority is valid
				fetchpriority="high"
				href={asset("/images/congress.jpg")}
			/>
			<link
				defer
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
			/>
			<link defer rel="stylesheet" href={asset("/styles.css")} />
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

export default App;
