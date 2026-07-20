import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PropertySearchForm } from "@/components/property-search-form";
import { PropertyCard } from "@/components/property-card";
import { getBusinessSettings } from "@/lib/business-settings";

export async function generateMetadata(): Promise<Metadata> {
  const business = await getBusinessSettings();
  return {
    title: `Imóveis disponíveis para alugar em ${business.addressCity}`,
    description: `Casas e apartamentos para alugar em ${business.addressCity}, com custo total transparente e garantia facilitada.`,
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ bairro?: string; quartos?: string; max?: string }>;
}) {
  const params = await searchParams;
  const bairro = params.bairro?.trim();
  const quartos = params.quartos ? Number(params.quartos) : undefined;
  const max = params.max ? Number(params.max) : undefined;

  const business = await getBusinessSettings();
  const properties = await prisma.property.findMany({
    where: {
      ...(bairro ? { bairro } : {}),
      ...(quartos ? { bedrooms: { gte: quartos } } : {}),
      ...(max ? { priceMonthly: { lte: max } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-carvao">
        Imóveis para alugar em {business.addressCity}
      </h1>
      <p className="text-grafite mt-1">
        {properties.length}{" "}
        {properties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
      </p>

      <div className="mt-6">
        <PropertySearchForm
          defaultBairro={bairro}
          defaultQuartos={params.quartos}
          defaultMax={params.max}
        />
      </div>

      {properties.length === 0 ? (
        <div className="mt-10 border border-dashed border-carvao/25 rounded-xl p-8 text-center">
          <p className="text-carvao font-medium">
            Nenhum imóvel encontrado com esses filtros.
          </p>
          <p className="text-grafite text-sm mt-1">
            Tente ampliar a faixa de preço ou ver outro bairro — ou fale com a
            gente no WhatsApp que a gente te ajuda a achar.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.codigo} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
