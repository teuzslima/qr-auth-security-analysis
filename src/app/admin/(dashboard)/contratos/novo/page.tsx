import Link from "next/link";
import { defaultValues } from "@/lib/contract/derive";
import { ContractEditor } from "../contract-editor";

export default function NewContractPage() {
  return (
    <section>
      <div className="mb-4">
        <Link href="/admin/contratos" className="text-xs text-anil hover:underline">
          ← Voltar aos contratos
        </Link>
        <h2 className="font-semibold mt-1">Novo contrato de locação</h2>
        <p className="text-sm text-neutral-500">
          Preencha os dados. A prévia à direita atualiza em tempo real. Ao
          salvar, é gerado o link de assinatura para o locatário.
        </p>
      </div>

      <ContractEditor initialValues={defaultValues()} initialOverrides={[]} />
    </section>
  );
}
