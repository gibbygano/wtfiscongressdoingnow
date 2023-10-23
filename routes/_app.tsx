import { AppProps, RouteConfig } from "$fresh/server.ts";
import Navigation from "../components/Navigation.tsx";
import Sidebar from "../components/Sidebar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RJB-FRESH</title>
      </head>
      <body>
        <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
          <Navigation />
          <main role="main" class="w-full flex-grow pt-1 px-3">
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

export const config: RouteConfig = {
  csp: true,
};
