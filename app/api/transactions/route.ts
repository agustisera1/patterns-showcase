import { createTransaction } from "@/lib/services/transactions";

export async function POST() {
  const transaction = await createTransaction();
  return Response.json(transaction, { status: 201 });
}
