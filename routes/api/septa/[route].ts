import { HandlerContext } from "$fresh/server.ts";

export interface SeptaBus {
  lat: string;
  lng: string;
  label: string;
  route_id: string;
  trip: string;
  VehicleID: string;
  BlockID: string;
  Direction: string;
  destination: string;
  heading?: string;
  late: number;
  next_stop_id: string;
  next_stop_name: string;
  next_stop_sequence: number;
  estimated_seat_availability: string;
  Offset: number;
  Offset_sec: string;
  timestamp: number;
}

const fetchData = async (route: string): Promise<string> => {
  const resp = await fetch(
    `https://www3.septa.org/api/TransitView/?route=${route}`,
  );
  const jsonResults = await resp.json();

  return JSON.stringify(jsonResults.bus);
};

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const busData = await fetchData(ctx.params.route);
  return new Response(busData);
};
