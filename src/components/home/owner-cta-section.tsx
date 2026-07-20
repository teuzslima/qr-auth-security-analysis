import { WhatsAppLink } from "@/components/whatsapp-link";
import { buildOwnerMessage } from "@/lib/whatsapp";
import { getBusinessSettings } from "@/lib/business-settings";

export async function OwnerCtaSection() {
  const business = await getBusinessSettings();

  return (
    <section className="bg-carvao text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl sm:text-2xl font-bold">
            É proprietário em {business.addressCity}?
          </p>
          <p className="text-white/80 mt-1">
            Anuncie seu imóvel pra locação com a {business.name}.
          </p>
        </div>
        <WhatsAppLink
          message={buildOwnerMessage()}
          origin="owner_cta"
          phone={business.whatsapp}
          className="inline-flex items-center justify-center bg-white text-carvao font-semibold px-5 py-3 rounded-full hover:bg-cal min-h-11 whitespace-nowrap"
        >
          Quero anunciar meu imóvel
        </WhatsAppLink>
      </div>
    </section>
  );
}
