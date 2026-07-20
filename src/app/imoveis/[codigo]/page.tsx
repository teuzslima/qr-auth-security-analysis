import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";
import { DoorPlate } from "@/components/door-plate";
import { PropertyGallery } from "@/components/property-gallery";
import { PropertySpecs } from "@/components/property-specs";
import { CostBreakdown } from "@/components/cost-breakdown";
import { PropertyNeighborhoodMap } from "@/components/property-neighborhood-map";
import { PropertyStickyCta } from "@/components/property-sticky-cta";
import { PropertyCard } from "@/components/property-card";
import { ViewTracker } from "@/components/view-tracker";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getBusinessSettings } from "@/lib/business-settings";

const typeLabels = { CASA: "Casa", APARTAMENTO: "Apartamento" };

async function getProperty(codigo: string) {
  return prisma.property.findUnique({ where: { codigo }, include: { broker: true } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ codigo: string }>;
}): Promise<Metadata> {
  const { codigo } = await params;
  const property = await getProperty(codigo);
  if (!property) return { title: "Imóvel não encontrado" };

  const photos = JSON.parse(property.photos) as string[];
  const title = `${property.title} — ${property.codigo} — ${formatBRL(property.priceMonthly)}/mês`;
  const description = `${typeLabels[property.type]} em ${property.bairro}, ${property.city}/${property.state}. ${property.bedrooms} quartos, ${property.areaM2}m². Custo total transparente e garantia facilitada.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: photos[0] ? [{ url: photos[0] }] : [],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;
  const property = await getProperty(codigo);

  if (!property) {
    notFound();
  }

  const photos = JSON.parse(property.photos) as string[];
  const similar = await prisma.property.findMany({
    where: {
      codigo: { not: property.codigo },
      OR: [{ bairro: property.bairro }, { type: property.type }],
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const business = await getBusinessSettings();
  const contactPhone = property.broker?.whatsapp ?? business.whatsapp;

  const imovel = {
    codigo: property.codigo,
    titulo: property.title,
    valorFormatado: formatBRL(property.priceMonthly),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${process.env.APP_URL ?? "http://localhost:3000"}/imoveis/${property.codigo}`,
    identifier: property.codigo,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: "BR",
    },
    numberOfRooms: property.bedrooms,
    floorSize: { "@type": "QuantitativeValue", value: property.areaM2, unitCode: "MTK" },
    offers: {
      "@type": "Offer",
      price: property.priceMonthly,
      priceCurrency: "BRL",
      availability:
        property.status === "DISPONIVEL"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <div className="pb-24">
      <ViewTracker codigo={property.codigo} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <PropertyGallery photos={photos} title={property.title} />

        <div className="flex items-start justify-between gap-4 mt-6">
          <div>
            <p className="font-utility text-xs uppercase tracking-wide text-grafite">
              {typeLabels[property.type]} · {property.bairro}, {property.city}/{property.state}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-carvao mt-1">
              {property.title}
            </h1>
          </div>
          <DoorPlate codigo={property.codigo} status={property.status} size="lg" />
        </div>

        <p className="text-carvao mt-4">{property.description}</p>

        {/* Custo total logo após a descrição — regra 6 não pode ficar */}
        {/* enterrada no fim da página, principalmente no mobile. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <PropertySpecs property={property} />

            <div className="mt-8">
              <PropertyNeighborhoodMap
                bairro={property.bairro}
                city={property.city}
                state={property.state}
              />
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-carvao mb-3">
                Planta baixa
              </h2>
              {property.floorPlanUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={property.floorPlanUrl}
                  alt={`Planta baixa — ${property.title}`}
                  className="w-full rounded-xl border border-carvao/10"
                />
              ) : (
                <div className="border border-dashed border-carvao/25 rounded-xl p-8 text-center text-grafite text-sm">
                  Planta baixa em breve.
                </div>
              )}
            </div>

            {property.broker && (
              <div className="mt-8 flex items-center gap-3 border border-carvao/10 rounded-xl p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.broker.photoUrl}
                  alt={property.broker.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12"
                />
                <div className="flex-1">
                  <p className="font-medium text-carvao text-sm">
                    Corretor responsável: {property.broker.name}
                  </p>
                  <p className="font-utility text-xs text-grafite">
                    CRECI {property.broker.creci}
                  </p>
                </div>
                <WhatsAppLink
                  message={`Olá ${property.broker.name.split(" ")[0]}! Tenho interesse no imóvel ${property.codigo} - ${property.title}.`}
                  origin="ficha_broker_card"
                  codigo={property.codigo}
                  phone={property.broker.whatsapp}
                  className="text-xs bg-mangue text-white font-semibold px-3 py-2 rounded-full hover:bg-mangue-escuro shrink-0"
                >
                  WhatsApp
                </WhatsAppLink>
              </div>
            )}
          </div>

          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="lg:sticky lg:top-20 space-y-4">
              <CostBreakdown property={property} />
              <p className="text-xs text-grafite text-center">
                Garantia deste imóvel: caução de{" "}
                {formatBRL(property.depositAmount)}.{" "}
                <a href="/caucao" className="text-anil underline">
                  Ver formas de garantia
                </a>
              </p>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-semibold text-carvao mb-4">
              Imóveis semelhantes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.codigo} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <PropertyStickyCta imovel={imovel} phone={contactPhone} />
    </div>
  );
}
