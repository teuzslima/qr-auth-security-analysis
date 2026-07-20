import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeData, packData } from "@/lib/contract/store";

// Atualiza um contrato. Contrato já assinado é imutável.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await prisma.generatedContract.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
  }
  if (existing.status === "SIGNED") {
    return NextResponse.json(
      { error: "Este contrato já foi assinado e não pode mais ser editado." },
      { status: 409 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const { values, overrides } = normalizeData(body?.data);

  await prisma.generatedContract.update({
    where: { id },
    data: { data: packData(values, overrides) },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.generatedContract.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}
