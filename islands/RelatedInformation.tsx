import { Box, CircularProgress, IconButton, Popover, Tooltip, Typography } from "@mui/material";
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
	const { billRelatedInforamtion: { results }, error, loading } = useFetchBillRelatedInformation(originalPackageId);

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
			<Tooltip title="View additional information">
				<IconButton aria-describedby={id} onClick={handleClick}>
					{children}
				</IconButton>
			</Tooltip>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl.value}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				{results.map((i) => (
					<>
						<Typography className="p-2">
							{new Date(i.dateIssued).toLocaleDateString()}: {i.billVersionLabel}
						</Typography>
					</>
				))}
			</Popover>
		</>
	);
};

export default RelatedInformation;
