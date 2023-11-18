import { JSX } from "preact/jsx-runtime";
import Error from "./Error.tsx";
import Loading from "./Loading.tsx";
import { ComponentChildren } from "preact";

type Props = {
	error: Error | null;
	loading: boolean;
	fullscreen?: boolean;
	children: ComponentChildren;
};

export default ({ error, loading, fullscreen = false, children }: Props) => {
	if (error?.name) {
		return <Error fullscreen={fullscreen}>{error.message}</Error>;
	}
	if (loading) {
		return <Loading fullscreen={fullscreen}>Loading...</Loading>;
	}

	return <>{children}</>;
};
