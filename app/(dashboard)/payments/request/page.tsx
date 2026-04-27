"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "loading" | "success" | "error";

export default function PaymentRequestPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/transactions", { method: "POST" });
    setStatus(res.status === 201 ? "success" : "error");
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Request Payment</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Submit a new payment for processing.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Payment details</CardTitle>
          <CardDescription>All fields are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="type">Payment type</Label>
              <Select required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                type="text"
                placeholder="Name, address or wallet"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="memo">
                Memo{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input id="memo" type="text" placeholder="Reference or note" />
            </div>

            {status === "success" && (
              <p className="text-sm text-green-600">
                Payment submitted successfully.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
            )}

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : "Submit payment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
