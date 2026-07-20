import Link from "next/link";
import { listContracts, unpackData } from "@/lib/contract/store";
import { contractDisplayTitle } from "@/lib/contract/render";
import { DeleteContractButton } from "./delete-contract-button";

export default async function AdminContractsPage() {
  const contracts = await listContracts();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold mb-1">Contratos de locação</h2>
          <p className="text-sm text-neutral-500">
            Gere um contrato preenchido e envie ao locatário um link para
            assinar. Imprima ou salve em PDF a qualquer momento.
          </p>
        </div>
        <Link
          href="/admin/contratos/novo"
          className="bg-mangue text-white rounded px-4 py-2 text-sm font-medium hover:bg-mangue-escuro whitespace-nowrap"
        >
          Novo contrato
        </Link>
      </div>

      {contracts.length === 0 ? (
        <p className="text-sm text-neutral-500 bg-white border rounded-lg p-6 text-center">
          Nenhum contrato gerado ainda. Clique em “Novo contrato” para começar.
        </p>
      ) : (
        <div className="bg-white border rounded-lg divide-y">
          {contracts.map((c) => {
            const { values } = unpackData(c.data);
            return (
              <div key={c.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {contractDisplayTitle(values)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Atualizado em {c.updatedAt.toLocaleDateString("pt-BR")} ·{" "}
                    {c.status === "SIGNED" ? (
                      <span className="text-mangue-escuro font-medium">
                        Assinado por {c.signerName} em{" "}
                        {c.signedAt?.toLocaleDateString("pt-BR")}
                      </span>
                    ) : (
                      <span className="text-latao-escuro">Rascunho (não assinado)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/contrato/${c.token}`}
                    target="_blank"
                    className="text-xs text-anil hover:underline"
                  >
                    Ver / assinar
                  </Link>
                  <Link
                    href={`/admin/contratos/${c.id}/editar`}
                    className="text-xs text-anil hover:underline"
                  >
                    {c.status === "SIGNED" ? "Ver" : "Editar"}
                  </Link>
                  <DeleteContractButton id={c.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
