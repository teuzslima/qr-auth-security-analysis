import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeData, packData } from "@/lib/contract/store";

// Cria um contrato novo (rascunho). Protegido pelo proxy (/api/admin/*).
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { values, overrides } = normalizeData(body?.data);

  const contract = await prisma.generatedContract.create({
    data: { data: packData(values, overrides) },
  });

  return NextResponse.json({ id: contract.id, token: contract.token }, { status: 201 });
}
