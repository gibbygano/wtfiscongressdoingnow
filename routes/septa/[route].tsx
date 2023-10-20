import { RouteContext } from "$fresh/server.ts";
import Transit from "../../islands/Transit.tsx";

const fetchTransitView = async (route: string) => {
  try {
    const resp = await fetch(
      `https://www3.septa.org/api/TransitView/?route=${route}`,
    );
    return (await resp.json()).bus;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async function Page(_req: Request, ctx: RouteContext) {
  const buses = await fetchTransitView(ctx.params.route);
  console.log(buses);
  return <Transit buses={buses} />;
}
