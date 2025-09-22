import { Collapse } from "components/shared";
import { ordinalize } from "utils";
import { useBillSummaryContext } from "context";
import "dayjs";
import type { CongressionalBill } from "types";

const dateFormatString = "dddd MMMM D, YYYY";

const BillTableCollapse = ({
  dateIssued,
  lastModified,
  title,
}: CongressionalBill) => {
  const { docClass, docId, docStatus, congress, packageId, versionNumber } =
    useBillSummaryContext();

  const collapseTitle = (
    <tr>
      <td aria-name="name">
        {docClass} {docId}
      </td>
      <td aria-name="title">{title}</td>
      <td aria-name="status">
        {docStatus}{" "}
        {versionNumber && (
          <>
            <br />
            {`${ordinalize(versionNumber)} Version`}
          </>
        )}
      </td>
      <td aria-name="congress">{ordinalize(congress)}</td>
      <td aria-name="issued">{dayjs(dateIssued).format(dateFormatString)}</td>
      <td aria-name="lastchange">
        {dayjs(lastModified).format(dateFormatString)}
      </td>
    </tr>
  );

  return (
    <Collapse packageId={packageId} collapseTitle={collapseTitle}>
      Sponsors Here References Here Actions Here
    </Collapse>
  );
};

export default BillTableCollapse;
