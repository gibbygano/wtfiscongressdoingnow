import * as denopsPopup from "https://deno.land/x/denops_popup@v2.2.0/mod.ts";

type Props = {
	originalPackageId: string;
};

interface BillRelatedInformation {
	results: Array<{
		dateIssued: Date;
		billVersion: string;
		packageId: string;
		packageLink: URL;
		billVersionLabel: string;
		lastModified: Date;
	}>;
}

const RelatedInformation = ({ originalPackageId }: Props) => {
    return (
    )
};
