import { Collapse } from "components/shared";
import { ordinalize } from "utils";
import { useBillSummaryContext } from "context";
import { format } from "date-fns/format";
import type { CongressionalBill } from "types";
import { dateFormatString } from "../../constants.tsx";

const BillTableCollapse = ({
  dateIssued,
  lastModified,
  title,
}: CongressionalBill) => {
  const { docClass, docId, docStatus, congress, packageId, versionNumber } =
    useBillSummaryContext();

  const collapseTitle = (
    <>
      <td aria-name="name">
        {docClass} {docId}
      </td>
      <td aria-name="title">{title}</td>
      <td aria-name="status">
        {docStatus} {versionNumber && (
          <>
            <br />
            {`${ordinalize(versionNumber)} Version`}
          </>
        )}
      </td>
      <td aria-name="congress">{ordinalize(congress)}</td>
      <td aria-name="issued">{format(dateIssued, dateFormatString)}</td>
      <td aria-name="lastchange">
        {format(lastModified, dateFormatString)}
      </td>
    </>
  );

  return (
    <tr>
      <Collapse joinName="" packageId={packageId} collapseTitle={collapseTitle}>
        Sponsors Here References Here Actions Here
      </Collapse>
    </tr>
  );
};

export default BillTableCollapse;
