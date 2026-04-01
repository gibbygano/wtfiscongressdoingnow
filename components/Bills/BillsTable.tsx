import { Table } from "components/shared";
import { BillSummaryContextProvider } from "context";
import type { CongressionalBill } from "types";
import BillTableCollapse from "./BillTableCollapse.tsx";

interface BillsTableProps {
  packages: Array<CongressionalBill>;
}

const BillsTable = ({ packages }: BillsTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Congress</th>
          <th>Issued</th>
          <th>Last Change</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((p) => {
          return (
            <BillSummaryContextProvider packageId={p.packageId}>
              <BillTableCollapse {...p} />
            </BillSummaryContextProvider>
          );
        })}
      </tbody>
    </Table>
  );
};

export default BillsTable;
