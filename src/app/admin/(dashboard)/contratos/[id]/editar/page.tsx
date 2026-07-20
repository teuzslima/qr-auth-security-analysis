import Link from "next/link";
import { notFound } from "next/navigation";
import { getContractById, unpackData } from "@/lib/contract/store";
import { ContractEditor } from "../../contract-editor";

export default async function EditContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contract = await getContractById(id);
  if (!contract) notFound();

  const { values, overrides } = unpackData(contract.data);
  const signed = contract.status === "SIGNED";

  return (
    <section>
      <div className="mb-4">
        <Link href="/admin/contratos" className="text-xs text-anil hover:underline">
          ← Voltar aos contratos
        </Link>
        <h2 className="font-semibold mt-1">
          {signed ? "Contrato assinado" : "Editar contrato"}
        </h2>
        {signed ? (
          <p className="text-sm bg-mangue/10 text-mangue-escuro border border-mangue/30 rounded p-3 mt-1">
            Assinado por <strong>{contract.signerName}</strong> (CPF{" "}
            {contract.signerCpf}) em{" "}
            {contract.signedAt?.toLocaleString("pt-BR")} · IP {contract.signerIp}.
            Este contrato não pode mais ser alterado.
          </p>
        ) : (
          <p className="text-sm text-neutral-500">
            A prévia à direita atualiza em tempo real. Copie o link de assinatura
            no topo da prévia.
          </p>
        )}
      </div>

      {signed ? (
        <SignedView token={contract.token} />
      ) : (
        <ContractEditor
          contractId={contract.id}
          initialValues={values}
          initialOverrides={overrides}
        />
      )}
    </section>
  );
}

function SignedView({ token }: { token: string }) {
  return (
    <a
      href={`/contrato/${token}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-anil text-white rounded px-4 py-2 text-sm font-medium hover:bg-anil-escuro"
    >
      Ver / imprimir contrato assinado →
    </a>
  );
}
