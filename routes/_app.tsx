import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function App({ Component, route }: AppProps) {
  console.log(route);
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RJB-FRESH</title>
      </head>
      <body>
        <Header active={route} />
        <div class="px-4 py-8 mx-auto bg-[#86efac]">
          <div class="max-w-screen-md mx-auto flex items-center justify-center flex-row flex-wrap">
            <Component />
          </div>
        </div>
      </body>
    </html>
  );
}
