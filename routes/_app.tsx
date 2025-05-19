import { Footer, Header } from "components";
import { define } from "utils";

export default define.page(({ Component }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>WTF Is Congress Doing Now?</title>
				<meta property="og:title" content="WTF Is Congress Doing Now?" />
				<meta property="og:url" content="https://wtfiscongressdoingnow.us" />
				<meta
					property="og:image"
					content="https://wtfiscongressdoingnow.us/pwa/windows11/SplashScreen.scale-400.png"
				/>
				<meta
					property="og:description"
					content="Find out WTF Congress is doing to us right now."
				/>
				<meta property="og:locale" content="en_US" />
				<meta property="og:locale:alternate" content="en_GB" />
				<link rel="stylesheet" href="/styles.css" />
			</head>
			<body class="min-h-screen flex flex-col">
				<Header />
				<main class="w-full h-full flex flex-col flex-grow bg-gradient-to-tr from-red-200 via-slate-100 to-blue-200">
					<Component />
				</main>
				<Footer />
			</body>
		</html>
	);
});
