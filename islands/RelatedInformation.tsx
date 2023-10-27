import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import useFetchBillRelatedInformation from "/hooks/useFetchBillRelatedInformation.ts";

type Props = {
	originalPackageId: string;
	children: string | JSX.Element;
};

export interface BillRelatedInformation {
	results: Array<{
		dateIssued: Date;
		billVersion: string;
		packageId: string;
		packageLink: URL;
		billVersionLabel: string;
		lastModified: string;
	}>;
}

const RelatedInformation = ({ originalPackageId, children }: Props) => {
	const anchorEl = useSignal<HTMLButtonElement | null>(null);
	const { billRelatedInforamtion: { results }, error, loading } = useFetchBillRelatedInformation(
		originalPackageId,
		anchorEl,
	);

	const handleClick = (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
		anchorEl.value = event.currentTarget;
	};
	const handleClose = () => {
		anchorEl.value = null;
	};
	const open = Boolean(anchorEl.value);
	const id = open ? "simple-popover" : undefined;

	return (
		<>
		</>
	);
};

export default RelatedInformation;
