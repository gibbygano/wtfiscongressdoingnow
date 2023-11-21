import { JSX } from "preact/jsx-runtime";
import Error from "./Error.tsx";
import Loading from "./Loading.tsx";
import { ComponentChildren } from "preact";

type Props = {
	error: Error | null;
	loading: boolean;
	children: ComponentChildren;
	alreadyHasData?: boolean;
	fullscreen?: boolean;
	loadingStatusMessage?: ComponentChildren;
	errorMessage?: (errorMessage: string) => ComponentChildren;
};

export default (
	{
		error,
		loading,
		children,
		fullscreen = false,
		alreadyHasData = false,
		loadingStatusMessage,
		errorMessage,
	}: Props,
) => {
	if (alreadyHasData && loading) {
		return (
			<>
				{children}
				<Loading>{loadingStatusMessage ?? "Loading More..."}</Loading>;
			</>
		);
	}

	if (error?.name) {
		return (
			<Error fullscreen={fullscreen}>
				{(errorMessage && errorMessage(error.message)) ?? error.message}
			</Error>
		);
	}
	if (loading) {
		return <Loading fullscreen={fullscreen}>{loadingStatusMessage ?? "Loading..."}</Loading>;
	}

	return <>{children}</>;
};
