import { Button, Loader, Main } from "lunchbox";
import useFetchBills from "../hooks/useFetchBills.ts";
import "humanizer";
import { JSX } from "preact/jsx-runtime";

export interface CongressionalBills {
	count: number;
	message?: string;
	nextPage?: URL;
	previousPage?: URL;
	packages: Array<{
		packageId: string;
		lastModified: Date;
		packageLink: URL;
		docClass: string;
		title: string;
		congress: number;
		dateIssued: Date;
	}>;
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

const Bills = () => {
	const fromDate = new Date("1996-04-26T04:00:00Z");
	const fromDateISO = new Date("1996-04-26T04:00:00Z").toISOString().split(".")[0] + "Z";
	const fromDateLocal = fromDate.toLocaleDateString();
	const { bills, loading, error } = useFetchBills(fromDateISO);

	if (error.isError) {
		return (
			<div
				class="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				{error.message}
			</div>
		);
	}

	const { count, message, nextPage, previousPage, packages } = bills;
	if (loading || packages.length === 0) {
		return (
			<Loader
				class="h-screen flex items-center justify-center"
				allowFullScreen={true}
			/>
		);
	}
	return (
		<>
			<span class="h-full flex items-center justify-center">
				<div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:text-sm lg:text-base text-xs  gap-3 p-10">
					{packages.map((p) => (
						<div class="inline-block mb-5">
							<span class="font-italic font-bold">{p.title}</span>
							<ul>
								<li>
									<label>Package Id:&nbsp;</label>
									{p.packageId}
								</li>
								<li>
									<label>Document Class:&nbsp;</label>
									{p.docClass}
								</li>
								<li>{p.congress.ordinalize()} Congress</li>
								<li>
									<label>Date Issued:&nbsp;</label>
									{new Date(p.dateIssued).toLocaleDateString()}
								</li>
								<li>
									<label>Last Modified:&nbsp;</label>
									{new Date(p.lastModified).toLocaleDateString()}
								</li>
							</ul>
							<Button
								class="mt-2"
								onClick={(e) => onDownloadClick(e, p.packageId, "pdf")}
							>
								PDF
							</Button>
						</div>
					))}
				</div>
			</span>
			<h1 class="font-bold m-5">
				{count} Results since {fromDateLocal}
			</h1>
		</>
	);
};

export default Bills;
