import { getContractTemplate } from "@/lib/contract-template";
import { ContractTemplateForm } from "./contract-template-form";

export default async function AdminContractPage() {
  const template = await getContractTemplate();

  return (
    <section>
      <h2 className="font-semibold mb-1">Modelo do contrato de locação</h2>
      <p className="text-sm text-neutral-500 mb-4">
        Estes campos são usados para gerar o contrato de todas as reservas.
        Dados do imóvel, do locatário e da caução são preenchidos
        automaticamente — aqui você edita apenas as condições gerais.
      </p>
      <p className="text-xs bg-amber-50 text-amber-800 border border-amber-200 rounded p-3 mb-4">
        Recomendamos que o texto das cláusulas gerais seja revisado por um
        advogado antes de ser usado em contratos reais.
      </p>
      <div className="bg-white border rounded-lg p-5 max-w-2xl">
        <ContractTemplateForm
          defaultLandlordName={template.landlordName}
          defaultRentDueDay={template.rentDueDay}
          defaultTermsText={template.termsText}
        />
      </div>
    </section>
  );
}
