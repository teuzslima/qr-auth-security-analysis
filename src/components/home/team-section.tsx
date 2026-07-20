import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { WhatsAppLink } from "@/components/whatsapp-link";

export async function TeamSection() {
  const brokers = await prisma.broker.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  if (brokers.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-carvao text-center">
        Quem vai te atender
      </h2>
      <p className="text-grafite text-center mt-2 max-w-lg mx-auto">
        Pessoa fecha com pessoa. Fale direto com quem cuida do imóvel.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {brokers.map((broker) => (
          <div
            key={broker.id}
            className="bg-white border border-carvao/10 rounded-xl p-5 text-center flex flex-col items-center"
          >
            <Image
              src={broker.photoUrl}
              alt={broker.name}
              width={96}
              height={96}
              loading="eager"
              className="rounded-full object-cover w-24 h-24"
            />
            <p className="font-display font-semibold text-carvao mt-3">{broker.name}</p>
            <p className="font-utility text-xs text-grafite mt-0.5">
              CRECI {broker.creci}
            </p>
            <WhatsAppLink
              message={`Olá ${broker.name.split(" ")[0]}! Vim pelo site da Muniz Imobiliária e gostaria de falar sobre um imóvel.`}
              origin="team_section"
              phone={broker.whatsapp}
              className="mt-4 inline-flex items-center gap-2 bg-mangue text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-mangue-escuro min-h-11"
            >
              Chamar no WhatsApp
            </WhatsAppLink>
          </div>
        ))}
      </div>
    </section>
  );
}
