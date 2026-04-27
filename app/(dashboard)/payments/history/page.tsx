import {
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  { id: "TXN-0041", date: "2026-04-26 14:32", type: "Crypto",        recipient: "0x1a2b...3c4d",  amount: "$1,200.00", fee: "$24.00",  status: "COMPLETED" },
  { id: "TXN-0040", date: "2026-04-26 11:10", type: "Credit",         recipient: "Jane Cooper",     amount: "$350.00",   fee: "$10.50",  status: "PENDING"   },
  { id: "TXN-0039", date: "2026-04-25 18:55", type: "Bank Transfer",  recipient: "Acme Corp",       amount: "$5,000.00", fee: "$0.00",   status: "FAILED"    },
  { id: "TXN-0038", date: "2026-04-25 09:21", type: "Crypto",         recipient: "0x9f8e...1a2b",  amount: "$780.00",   fee: "$15.60",  status: "COMPLETED" },
  { id: "TXN-0037", date: "2026-04-24 16:04", type: "Credit",         recipient: "Mark Evans",      amount: "$120.00",   fee: "$3.60",   status: "COMPLETED" },
  { id: "TXN-0036", date: "2026-04-24 12:30", type: "Bank Transfer",  recipient: "Global Supplies", amount: "$2,800.00", fee: "$0.00",   status: "COMPLETED" },
  { id: "TXN-0035", date: "2026-04-23 10:15", type: "Credit",         recipient: "Sara Lind",       amount: "$95.00",    fee: "$2.85",   status: "FAILED"    },
  { id: "TXN-0034", date: "2026-04-22 08:50", type: "Crypto",         recipient: "0x3d4e...5f6a",  amount: "$3,400.00", fee: "$68.00",  status: "COMPLETED" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  COMPLETED: "default",
  PENDING: "secondary",
  FAILED: "destructive",
};

export default function PaymentsHistoryPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transaction History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All payment activity across your account.
        </p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {tx.date}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-normal">
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{tx.recipient}</TableCell>
                <TableCell className="text-sm font-medium text-right">
                  {tx.amount}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground text-right">
                  {tx.fee}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[tx.status]} className="text-xs">
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
