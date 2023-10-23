import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

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

type Props = {
  route: string;
};

const Transit = ({ route }: Props) => {
  const buses = useSignal<SeptaBus[]>([]);

  useEffect(() => {
    fetchTransitView(route);

    const timer = setInterval(() => {
      fetchTransitView(route);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const fetchTransitView = async (route: string) => {
    try {
      const resp = await fetch(`/api/septa/${route}`);
      buses.value = await resp.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (!buses.value || buses.value.length < 1) return <h1>Loading...</h1>;

  return (
    <>
      {buses.value.map((bus) => {
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
};

export default Transit;
