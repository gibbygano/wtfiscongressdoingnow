import { Card, LinkButton } from "components/shared";
import { useBillSummaryContext } from "context";
import "dayjs";
import { TbFileTypePdf } from "@preact-icons/tb";
import { BillSummaryAccordion } from "./BillSummaryAccordion.tsx";
import { CongressionalBill } from "types";
import { ordinalize } from "utils";

const BillCard = ({ dateIssued, lastModified, title }: CongressionalBill) => {
  const { docClass, docId, docStatus, congress, packageId, versionNumber } =
    useBillSummaryContext();

  return (
    <Card
      key={`${packageId}-card`}
      headerText={`${docClass} ${docId}`}
      bodyChildren={[<BillSummaryAccordion key={`${packageId}-accordion`} />]}
      actionChildren={[
        <LinkButton
          key={`${packageId}-pdf`}
          className="mt-7"
          href={`/api/bills/download/${packageId}?docType=pdf`}
          target="_PDF"
          label="Download PDF"
          rel="noreferrer"
        >
          <TbFileTypePdf class="w-8 h-8" />
        </LinkButton>,
      ]}
    >
      <blockquote class="dark:prose-invert line-clamp-6 text-pretty">
        {title}
      </blockquote>
      <p class="text-gray-800 dark:text-gray-400 clear-left font-semibold">
        {docStatus}
        <br />
        {versionNumber && (
          <>
            {`${ordinalize(versionNumber)} Version`}
            <br />
          </>
        )}
        {ordinalize(congress)} Congress
      </p>
      <p class="text-gray-800 dark:text-gray-400 clear-left text-pretty">
        Date Issued:{" "}
        <span class="text-nowrap">
          {dayjs(dateIssued).format("dddd MMMM D, YYYY")}
        </span>
        <br />
        <br />
        Last Change:{" "}
        <span class="text-nowrap">
          {dayjs(lastModified).format("dddd MMMM D, YYYY")}
        </span>
      </p>
    </Card>
  );
};

export { BillCard };
