import { JSX } from "preact/jsx-runtime";
import Error from "./Error.tsx";
import Loading from "./Loading.tsx";

type Props = {
	error: Error | undefined;
	loading: boolean | undefined;
	className?: string | undefined;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	fullscreen?: boolean;
};

export default ({ error, loading, className, children, fullscreen = false }: Props) => {
	if (error?.name) {
		return <Error className={className} fullscreen={fullscreen}>{error.message}</Error>;
	}
	if (loading) {
		return <Loading className={className} fullscreen={fullscreen}>Loading...</Loading>;
	}

	return <>{children}</>;
};
