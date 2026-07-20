import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContractByToken, unpackData } from "@/lib/contract/store";
import { renderContractHtml, contractDisplayTitle } from "@/lib/contract/render";
import { PublicSignForm } from "./public-sign-form";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Contrato de locação",
  robots: { index: false, follow: false },
};

export default async function PublicContractPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const contract = await getContractByToken(token);
  if (!contract) notFound();

  const { values } = unpackData(contract.data);
  const html = renderContractHtml(values);
  const signed = contract.status === "SIGNED";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Barra de ações — não aparece na impressão */}
      <div className="no-print flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl font-bold">Contrato de locação</h1>
          <p className="text-sm text-neutral-500">{contractDisplayTitle(values)}</p>
        </div>
        <PrintButton />
      </div>

      {signed ? (
        <div className="no-print mb-4 text-sm bg-mangue/10 text-mangue-escuro border border-mangue/30 rounded p-3">
          Contrato assinado eletronicamente por <strong>{contract.signerName}</strong>{" "}
          (CPF {contract.signerCpf}) em {contract.signedAt?.toLocaleString("pt-BR")}.
        </div>
      ) : (
        <div className="no-print mb-4 text-sm bg-amber-50 text-amber-800 border border-amber-200 rounded p-3">
          Revise o contrato abaixo. Ao final, preencha seus dados para assinar
          eletronicamente. Campos ainda em branco aparecem destacados.
        </div>
      )}

      {/* Documento imprimível */}
      <article className="contract-document contract-print bg-white border rounded-lg p-8 shadow-sm">
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {signed && (
          <div className="contract-signature-block">
            <p><strong>ASSINADO ELETRONICAMENTE</strong></p>
            <p>Nome: {contract.signerName}</p>
            <p>CPF: {contract.signerCpf}</p>
            <p>
              Data/hora: {contract.signedAt?.toLocaleString("pt-BR")} — IP:{" "}
              {contract.signerIp}
            </p>
            <p className="contract-signature-hash">
              Código de verificação (SHA-256): {contract.documentHash}
            </p>
            <p className="contract-signature-note">
              Documento aceito eletronicamente pelo locatário identificado acima,
              com registro de data, hora e endereço IP, nos termos da MP nº
              2.200-2/2001.
            </p>
          </div>
        )}
      </article>

      {/* Painel de assinatura — não aparece na impressão */}
      {!signed && (
        <div className="no-print mt-6 bg-white border rounded-lg p-5 max-w-md">
          <h2 className="font-semibold mb-3">Assinar contrato</h2>
          <PublicSignForm
            token={token}
            defaultName={values.locatario_nome ?? ""}
            defaultCpf={values.locatario_cpf ?? ""}
          />
        </div>
      )}
    </div>
  );
}
