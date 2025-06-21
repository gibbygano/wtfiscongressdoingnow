import { JSX } from "preact/jsx-runtime";
import Error from "./Error.tsx";
import Loading from "./Loading.tsx";
import clsx from "clsx";
import { load } from "@std/dotenv";

type Props = {
	error: Error | undefined;
	loading: boolean | undefined;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	fullscreen?: boolean;
};

export default ({ error, loading, children, fullscreen = false }: Props) => {
	if (error?.name) {
		return <Error fullscreen={fullscreen}>{error.message}</Error>;
	}

	return (
		<>
			{loading && (
				<Loading fullscreen={fullscreen}>
					Loading...
				</Loading>
			)}
			<span
				class={clsx("transition ease-in-out duration-1000", {
					"opacity-0": loading && !fullscreen,
					"pointer-events-none opacity-25": loading &&
						fullscreen,
				})}
			>
				{children}
			</span>
		</>
	);
};
