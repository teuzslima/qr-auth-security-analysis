import Link from "next/link";
import { getBusinessSettings } from "@/lib/business-settings";
import { company } from "@/lib/company";

export async function SiteFooter() {
  const business = await getBusinessSettings();

  // Endereço: usa o que o admin preencher; se estiver em branco, cai no
  // endereço institucional real da matriz.
  const hasStreet = business.addressStreet.trim().length > 0;
  const street = hasStreet ? business.addressStreet : company.address.street;
  const neighborhood = hasStreet
    ? business.addressNeighborhood
    : company.address.neighborhood;
  const city = hasStreet ? business.addressCity : company.address.city;
  const state = hasStreet ? business.addressState : company.address.state;
  const mapQuery = `${street}, ${neighborhood}, ${city} - ${state}`;

  return (
    <footer className="bg-anil text-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-xl font-semibold">{business.name}</p>
          <p className="font-utility text-sm mt-1 text-white/80">
            CRECI {business.creci} · CNPJ {company.cnpj}
          </p>

          <div className="mt-4 text-sm text-white/90 space-y-1">
            <p>{street}</p>
            <p>
              {neighborhood} · {city}/{state}
              {hasStreet && business.addressZip ? ` · ${business.addressZip}` : ""}
            </p>
            {business.hours && (
              <p className="text-white/60 text-xs">{business.hours}</p>
            )}
          </div>

          <a
            href={`tel:+${business.whatsapp}`}
            className="inline-block mt-4 text-sm font-medium underline decoration-white/40 hover:decoration-white"
          >
            {business.phoneDisplay}
          </a>
          <br />
          <a
            href={`mailto:${company.email}`}
            className="inline-block mt-1 text-sm text-white/90 underline decoration-white/40 hover:decoration-white"
          >
            {company.email}
          </a>

          {(business.instagramUrl || business.facebookUrl) && (
            <div className="flex gap-4 mt-3 text-sm">
              {business.instagramUrl && (
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 hover:decoration-white"
                >
                  Instagram
                </a>
              )}
              {business.facebookUrl && (
                <a
                  href={business.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 hover:decoration-white"
                >
                  Facebook
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-white/70 mb-2">Institucional</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Imóveis
              </Link>
            </li>
            <li>
              <Link href="/quem-somos" className="hover:underline">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/caucao" className="hover:underline">
                Como funciona a caução
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade" className="hover:underline">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm text-white/70 mb-2">Onde estamos</p>
          <div className="rounded-lg overflow-hidden border border-white/20 bg-white/5" style={{ height: 200 }}>
            <iframe
              title={`Mapa — ${city}/${state}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {company.tradeName} ({company.legalName}) ·
            CNPJ {company.cnpj}
          </span>
          <span>Locação residencial em {city}/{state}</span>
        </div>
      </div>
    </footer>
  );
}
