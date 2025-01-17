import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { InvoiceActions } from "./InvoiceActions";

export function InvoiceList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice Id</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-1234</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>$100.00</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>2022-01-01</TableCell>
          <TableCell className="text-right">
            <InvoiceActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
