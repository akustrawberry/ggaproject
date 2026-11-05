import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Tidak dibenarkan" }, { status: 401 });
  }

  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "asc" } });
  const csv = ["email,tarikh_langgan", ...subscribers.map((s) => `${s.email},${s.createdAt.toISOString()}`)].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pelanggan-legakan.csv"',
    },
  });
}
