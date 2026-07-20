import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/hero";
import { PropertySearchForm } from "@/components/property-search-form";
import { PropertyCard } from "@/components/property-card";
import { GuaranteeSection } from "@/components/home/guarantee-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { OwnerCtaSection } from "@/components/home/owner-cta-section";

const statusPriority = { DISPONIVEL: 0, RESERVADO: 1, ALUGADO: 2 };

export default async function HomePage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 9,
  });

  const sorted = [...properties].sort(
    (a, b) => statusPriority[a.status] - statusPriority[b.status],
  );

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 -mt-6 sm:-mt-8 relative">
        <PropertySearchForm />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-carvao">
            Imóveis em destaque
          </h2>
          <Link href="/imoveis" className="text-sm font-medium text-anil hover:underline">
            Ver todos →
          </Link>
        </div>

        {sorted.length === 0 ? (
          <p className="text-grafite">
            Nenhum imóvel cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((property) => (
              <PropertyCard key={property.codigo} property={property} />
            ))}
          </div>
        )}
      </section>

      <GuaranteeSection />
      <HowItWorks />
      <TeamSection />
      <TestimonialsSection />
      <OwnerCtaSection />
    </>
  );
}
