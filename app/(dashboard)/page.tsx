import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const kpis = [
  { label: "Total Balance", value: "$48,230.00", delta: "+2.4% vs last month" },
  { label: "Volume Today", value: "$12,450.00", delta: "14 transactions" },
  { label: "Pending", value: "3", delta: "Awaiting processing" },
  { label: "Failed Checks", value: "1", delta: "Requires attention", alert: true },
];

const recent = [
  { id: "TXN-0041", type: "Crypto", recipient: "0x1a2b...3c4d", amount: "$1,200.00", status: "COMPLETED" },
  { id: "TXN-0040", type: "Credit", recipient: "Jane Cooper", amount: "$350.00", status: "PENDING" },
  { id: "TXN-0039", type: "Bank Transfer", recipient: "Acme Corp", amount: "$5,000.00", status: "FAILED" },
  { id: "TXN-0038", type: "Crypto", recipient: "0x9f8e...1a2b", amount: "$780.00", status: "COMPLETED" },
  { id: "TXN-0037", type: "Credit", recipient: "Mark Evans", amount: "$120.00", status: "COMPLETED" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  COMPLETED: "default",
  PENDING: "secondary",
  FAILED: "destructive",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          April 26, 2026
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-1 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className={`text-2xl font-semibold ${kpi.alert ? "text-destructive" : ""}`}>
                {kpi.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Recent Transactions</h2>
          <Link
            href="/payments/history"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            View all <ArrowUpRight className="ml-1 size-3.5" />
          </Link>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell className="text-sm">{tx.recipient}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{tx.amount}</TableCell>
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
    </div>
  );
}
