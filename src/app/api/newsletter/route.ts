import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const window = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  window.push(now);
  hits.set(ip, window);
  return window.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Terlalu banyak percubaan. Sila cuba sebentar lagi." }, { status: 429 });
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Borang tidak sah." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Alamat e-mel tidak sah." }, { status: 400 });
  }

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan. Sila cuba lagi." }, { status: 500 });
  }

  return NextResponse.json({ message: "Terima kasih! Anda telah melanggan buletin Legakan." });
}
