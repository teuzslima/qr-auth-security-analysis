import type { Metadata } from "next";
import { getBusinessSettings } from "@/lib/business-settings";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Como funciona a caução",
  description:
    "Entenda o que é a caução no aluguel residencial: valor de garantia, onde fica o dinheiro, quando é devolvido e as alternativas.",
};

const blocks = [
  {
    title: "O que é a caução",
    text: "É um valor de garantia — não é uma taxa extra nem dinheiro perdido. Por lei, pode ser de no máximo 3 meses de aluguel. Serve para cobrir eventuais danos ao imóvel ou dívidas (água, luz, condomínio) deixadas pelo inquilino.",
  },
  {
    title: "Onde fica o dinheiro",
    text: "É depositado em caderneta de poupança em nome do inquilino, conforme a Lei do Inquilinato (Lei nº 8.245/1991). Ou seja: o valor rende juros durante todo o contrato e continua sendo seu.",
  },
  {
    title: "Quando é devolvido",
    text: "Integralmente ao final do contrato, após a entrega das chaves e a vistoria do imóvel, desde que não haja danos nem pendências. O prazo de devolução é definido em contrato.",
  },
  {
    title: "Alternativas à caução em dinheiro",
    text: "Se preferir, existem outras formas de garantia: fiador, seguro-fiança ou título de capitalização. A gente te ajuda a escolher a melhor opção para o seu caso.",
  },
  {
    title: "Sempre formalizada",
    text: "A caução é sempre registrada em contrato e recibo — nunca cobrada de maneira informal. Transparência do início ao fim.",
  },
];

export default async function CaucaoPage() {
  const business = await getBusinessSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <div className="flex items-start gap-4">
        <ShieldIcon />
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-carvao">
            Como funciona a caução
          </h1>
          <p className="text-grafite mt-2">
            Garantia que volta pra você. Sem pegadinha, sem letra miúda.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {blocks.map((block, i) => (
          <div
            key={block.title}
            className="flex gap-4 border border-carvao/12 rounded-xl p-5 bg-white"
          >
            <span className="font-utility shrink-0 w-8 h-8 rounded-full bg-anil text-white font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <h2 className="font-display font-semibold text-carvao">{block.title}</h2>
              <p className="text-sm text-carvao mt-1 leading-relaxed">{block.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-mangue text-white rounded-xl p-6 text-center">
        <p className="font-display text-xl font-semibold">
          Ficou com dúvida sobre a garantia do seu aluguel?
        </p>
        <p className="text-white/90 mt-1 text-sm">
          Fale com a gente que explicamos tudo, sem compromisso.
        </p>
        <div className="mt-4">
          <WhatsAppLink
            message="Olá! Tenho dúvidas sobre a caução / garantia do aluguel."
            origin="caucao_page"
            phone={business.whatsapp}
            className="inline-flex items-center gap-2 bg-white text-mangue-escuro font-semibold px-5 py-3 rounded-full hover:bg-cal min-h-11"
          >
            Tirar dúvidas no WhatsApp
          </WhatsAppLink>
        </div>
      </div>

      <p className="text-xs text-grafite mt-6 text-center">
        As condições específicas (valor, prazo de devolução e forma de garantia)
        constam no contrato de locação de cada imóvel.
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="44"
      height="44"
      className="text-anil shrink-0 mt-1"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 4 L40 10 V24 C40 34 33 41 24 44 C15 41 8 34 8 24 V10 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M17 24 l5 5 l9 -10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
