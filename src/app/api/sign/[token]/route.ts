import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unpackData } from "@/lib/contract/store";
import { renderContractHtml } from "@/lib/contract/render";
import { isValidCpf } from "@/lib/contract/derive";

const signSchema = z.object({
  signerName: z.string().trim().min(3),
  signerCpf: z.string().trim().min(11),
  agree: z.literal(true),
});

// Assinatura eletrônica pública do contrato via token do link. Registra nome,
// CPF, IP, data/hora e um hash do documento renderizado (âncora de integridade).
export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const body = await request.json().catch(() => ({}));
  const parsed = signSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Preencha nome, CPF e aceite os termos para assinar." },
      { status: 400 },
    );
  }
  if (!isValidCpf(parsed.data.signerCpf)) {
    return NextResponse.json({ error: "CPF inválido." }, { status: 400 });
  }

  const contract = await prisma.generatedContract.findUnique({ where: { token } });
  if (!contract) {
    return NextResponse.json({ error: "Contrato não encontrado." }, { status: 404 });
  }
  if (contract.status === "SIGNED") {
    return NextResponse.json({ error: "Este contrato já foi assinado." }, { status: 409 });
  }

  const { values } = unpackData(contract.data);
  const html = renderContractHtml(values);
  const documentHash = crypto.createHash("sha256").update(html).digest("hex");
  const signerIp =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "desconhecido";

  await prisma.generatedContract.update({
    where: { token },
    data: {
      status: "SIGNED",
      signerName: parsed.data.signerName,
      signerCpf: parsed.data.signerCpf,
      signerIp,
      signedAt: new Date(),
      documentHash,
    },
  });

  return NextResponse.json({ success: true });
}
