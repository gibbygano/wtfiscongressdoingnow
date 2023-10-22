import { PageProps } from "$fresh/server.ts";
import Transit from "../../islands/Transit.tsx";

export default function Page(props: PageProps) {
  return <Transit route={props.params.route} />;
}
