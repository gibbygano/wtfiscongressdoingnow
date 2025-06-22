import Error from "./Error.tsx";
import { JSX } from "preact/jsx-runtime";
import Loading from "./Loading.tsx";
import clsx from "clsx";

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
				class={clsx("will-change-transform transition ease-in-out duration-1000", {
					"filter opacity-0": loading && !fullscreen,
					"pointer-events-none filter opacity-25": loading &&
						fullscreen,
				})}
			>
				{children}
			</span>
		</>
	);
};
