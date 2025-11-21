import { HttpError, PageProps } from "fresh";
import { TbError404 } from "@preact-icons/tb";

export default function ErrorPage(props: PageProps) {
  const error = props.error; // Contains the thrown Error or HTTPError
  if (error instanceof HttpError) {
    const status = error.status; // HTTP status code

    // Render a 404 not found page
    if (status === 404) {
      return (
        <div class="w-full text-center p-10">
          <span class="text-6xl">
            <TbError404 class="m-auto text-red-500" />
            Page not found
          </span>
        </div>
      );
    }
  }

  return <h1>Oh no...</h1>;
}
