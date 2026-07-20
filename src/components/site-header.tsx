import Link from "next/link";
import { getBusinessSettings } from "@/lib/business-settings";
import { WhatsAppLink } from "@/components/whatsapp-link";

export async function SiteHeader() {
  const business = await getBusinessSettings();
  const telHref = `tel:+${business.whatsapp}`;

  return (
    <header className="border-b border-carvao/10 bg-cal/95 backdrop-blur supports-[backdrop-filter]:bg-cal/80 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-lg font-semibold text-anil">
            {business.name}
          </span>
          <span className="font-utility text-[11px] tracking-wide text-grafite">
            CRECI {business.creci} · {business.addressCity}/{business.addressState}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/quem-somos"
            className="hidden sm:inline text-sm font-medium text-carvao hover:text-anil"
          >
            Quem somos
          </Link>
          <a
            href={telHref}
            className="hidden sm:inline text-sm font-medium text-carvao hover:text-anil"
          >
            {business.phoneDisplay}
          </a>
          <WhatsAppLink
            message={`Olá! Vim pelo site da ${business.name} e quero saber mais sobre os imóveis disponíveis.`}
            origin="header"
            phone={business.whatsapp}
            className="inline-flex items-center gap-2 bg-mangue text-white text-sm font-semibold px-3 py-2 sm:px-4 rounded-full hover:bg-mangue-escuro min-h-11"
          >
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </header>
  );
}
