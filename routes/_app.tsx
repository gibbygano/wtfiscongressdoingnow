import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function App({ Component, route }: AppProps) {
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
          <div class="mx-auto items-center justify-center grid grid-cols-3 gap-3">
            <Component />
          </div>
        </div>
      </body>
    </html>
  );
}
