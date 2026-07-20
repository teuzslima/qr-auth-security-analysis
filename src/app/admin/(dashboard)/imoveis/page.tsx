import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusSelect } from "../status-select";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const typeLabels: Record<string, string> = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
};

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Imóveis cadastrados</h2>
        <Link
          href="/admin/imoveis/novo"
          className="text-sm bg-emerald-700 text-white rounded px-3 py-1.5 hover:bg-emerald-800"
        >
          + Novo imóvel
        </Link>
      </div>
      <div className="bg-white border rounded-lg divide-y">
        {properties.length === 0 && (
          <p className="p-4 text-sm text-neutral-500">Nenhum imóvel cadastrado.</p>
        )}
        {properties.map((property) => (
          <div key={property.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">
                <span className="font-mono text-xs bg-neutral-100 px-1.5 py-0.5 rounded mr-2">
                  {property.codigo}
                </span>
                {property.title}{" "}
                <span className="text-xs font-normal text-neutral-500">
                  ({typeLabels[property.type] ?? property.type})
                </span>
              </p>
              <p className="text-sm text-neutral-500">
                {property.bairro}, {property.city} · {formatBRL(property.priceMonthly)}/mês
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StatusSelect propertyId={property.id} status={property.status} />
              <Link
                href={`/admin/imoveis/${property.id}/editar`}
                className="text-xs border rounded px-2 py-1 hover:bg-neutral-50"
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
