import { runCheck } from "@/lib/services/checks";

export async function POST() {
  const result = await runCheck();
  return Response.json(result, { status: 200 });
}
