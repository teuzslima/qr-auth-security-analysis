import type { Metadata } from "next";
import { company, fullAddress } from "@/lib/company";
import { getBusinessSettings } from "@/lib/business-settings";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "Conheça a história da Muniz Imobiliária, administradora de imóveis em Aracaju/SE desde 2001.",
};

export default async function QuemSomosPage() {
  const business = await getBusinessSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-carvao">
        Quem somos
      </h1>
      <p className="font-utility text-sm text-grafite mt-2">
        Administradora de imóveis em Aracaju/SE desde {company.foundedYear}.
      </p>

      <div className="mt-8 space-y-5 text-carvao leading-relaxed">
        <p>
          A Muniz Imobiliária começou suas atividades ainda em uma pequena sede
          situada na Rua Teixeira de Freitas, bairro Salgado Filho. Tendo sempre
          a ética e o compromisso como valores fundamentais no exercício diário
          com seus clientes, iniciamos nossas atividades no ano de{" "}
          {company.foundedYear}.
        </p>
        <p>
          Com o decorrer dos anos, procuramos investir em tecnologia para o
          atendimento ao cliente e no desenvolvimento de nossos colaboradores.
          Nos especializamos na administração de imóveis, com garantia total dos
          aluguéis e dos encargos que recaem sobre eles.
        </p>
        <p>
          A Muniz Imobiliária solidificou sua presença no mercado imobiliário de
          Sergipe ao longo do tempo. Através de determinação e respeito, a
          empresa formou sua equipe, investindo na capacitação dos colaboradores
          e dedicando-se profundamente ao atendimento aos clientes. Essa
          abordagem conquistou espaço e confiança na comunidade sergipana.
          Atualmente, fruto de um árduo trabalho, tornamo-nos uma das maiores
          administradoras de imóveis do estado, reconhecida por sua
          credibilidade não apenas localmente, mas também além das fronteiras
          estaduais.
        </p>
      </div>

      <div className="mt-10 border border-carvao/15 rounded-xl p-5 bg-white">
        <h2 className="font-display text-lg font-semibold text-carvao">
          Dados da empresa
        </h2>
        <dl className="mt-3 text-sm text-carvao space-y-1.5 font-utility">
          <div>
            <dt className="inline text-grafite">Razão social: </dt>
            <dd className="inline">
              {company.tradeName} ({company.legalName})
            </dd>
          </div>
          <div>
            <dt className="inline text-grafite">CNPJ: </dt>
            <dd className="inline tabular-nums">{company.cnpj}</dd>
          </div>
          <div>
            <dt className="inline text-grafite">CRECI: </dt>
            <dd className="inline">{business.creci}</dd>
          </div>
          <div>
            <dt className="inline text-grafite">{company.address.label}: </dt>
            <dd className="inline">{fullAddress()}</dd>
          </div>
          <div>
            <dt className="inline text-grafite">Telefone/WhatsApp: </dt>
            <dd className="inline">{company.phoneDisplay}</dd>
          </div>
          <div>
            <dt className="inline text-grafite">E-mail: </dt>
            <dd className="inline">
              <a
                href={`mailto:${company.email}`}
                className="text-anil underline decoration-anil/30 hover:decoration-anil"
              >
                {company.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <WhatsAppLink
          message={`Olá! Vim pelo site da ${company.tradeName} e quero saber mais.`}
          origin="quem_somos"
          phone={business.whatsapp}
          className="inline-flex items-center gap-2 bg-mangue text-white font-semibold px-5 py-3 rounded-full hover:bg-mangue-escuro min-h-11"
        >
          Falar no WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
