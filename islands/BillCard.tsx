import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { InfoRounded } from "@mui/icons-material";
import RelatedInformation from "/islands/RelatedInformation.tsx";
import { JSX } from "preact/jsx-runtime";

export interface Bill {
	packageId: string;
	lastModified: Date;
	packageLink: URL;
	docClass: string;
	title: string;
	congress: number;
	dateIssued: Date;
}

const onDownloadClick = (
	e: JSX.TargetedMouseEvent<HTMLElement>,
	packageId: string,
	docType: string,
) => {
	e.preventDefault();
	const docWindow = window.open();
	fetch(`/api/bills/download/${packageId}?docType=${docType}`, {
		headers: {
			"Accept": "application/pdf",
		},
	}).then((response) => {
		if (!response.ok) throw new Error(response.statusText);
		return response;
	}).then((response) => response.blob()).then((blob) => {
		if (!docWindow) {
			throw new Error("Could not open new window to display document");
		}
		docWindow.location.href = URL.createObjectURL(blob);
	});
};

const BillCard = ({ packageId, lastModified, dateIssued, title, docClass, congress }: Bill) => (
	<>
		<CardContent>
			<Typography variant="body1" sx={{ fontWeight: "bold" }} gutterBottom>
				{title}
			</Typography>
			<Typography sx={{}} variant="subtitle1" color="text.secondary" component="div">
				{packageId}
			</Typography>
			<Typography variant="body2">
				{congress.ordinalize()} Congress
			</Typography>
			<Typography sx={{ mt: 2 }} variant="body1">
				Date Issued: {new Date(dateIssued).toLocaleDateString()}
				<br />
				Last Modified: {new Date(lastModified).toLocaleDateString()}
			</Typography>
		</CardContent>
		<CardActions disableSpacing sx={{ mt: "auto" }}>
			<Button
				onClick={(e: JSX.TargetedMouseEvent<HTMLElement>) => onDownloadClick(e, packageId, "pdf")}
			>
				PDF
			</Button>
			<RelatedInformation originalPackageId={packageId}>
				<InfoRounded />
			</RelatedInformation>
		</CardActions>
	</>
);

export default BillCard;
