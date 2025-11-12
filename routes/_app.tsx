import { asset } from "fresh/runtime";
import { Footer, Header } from "components";
import { define } from "../utils.ts";

const App = define.page(({ Component, url }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="WTF Is Congress Doing Now?" />
      <meta
        property="og:image"
        content="https://wtfiscongressdoingnow.us/images/seal.png"
      />
      <meta
        property="og:description"
        content="Keep up with what congress is doing. Now fortified with executive orders! Powered by Congress.gov and GovInfo."
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
    </head>
    <body class="max-h-screen flex flex-col md:overflow-y-hidden bg-linear-to-tr bg-fixed from-[#B31942]/80 via-slate-300 to-[#0A3161]/80">
      <Header />
      <main class="max-w-screen mb-12 md:overflow-y-auto">
        <Component />
      </main>
      <Footer path={url.pathname} />
    </body>
  </html>
));

export default App;
