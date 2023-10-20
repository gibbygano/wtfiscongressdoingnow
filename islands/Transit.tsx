interface SeptaBus {
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

export default function Transit(props: { buses: SeptaBus[] }) {
  if (!props.buses) return <h1>Issue Reaching SEPTA API</h1>;

  return (
    <>
      {props.buses.map((bus) => {
        const { destination, Direction, VehicleID, route_id, ...restBus } = bus;
        return (
          <span class="border-solid border-2 border-sky-500 p-5 flex flex-col">
            <h1 class="mt-5 mb-2 whitespace-nowrap">
              {route_id} - {destination} ({Direction}) [{VehicleID}]
            </h1>
            <ul>
              {Object.entries(restBus).map(([key, value], _index) => (
                <li>{key}: {value}</li>
              ))}
            </ul>
          </span>
        );
      })}
    </>
  );
}
