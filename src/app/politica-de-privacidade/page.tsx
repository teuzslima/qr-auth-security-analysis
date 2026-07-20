import type { Metadata } from "next";
import { company, fullAddress } from "@/lib/company";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Muniz Imobiliária, em conformidade com a LGPD (Lei nº 13.709/2018).",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-carvao">
        Política de Privacidade
      </h1>

      <div className="mt-6 space-y-5 text-carvao leading-relaxed text-[15px]">
        <p>
          A nossa Política de Privacidade tem por objetivo demonstrar o
          compromisso da {company.tradeName} ({company.legalName}), pessoa
          jurídica de Direito Privado, inscrita no CNPJ sob o nº {company.cnpj},
          com sede à {fullAddress()}, com a privacidade e a proteção dos dados
          pessoais coletados de seus USUÁRIOS, estabelecendo regras sobre a
          coleta, registro, armazenamento, uso, compartilhamento e eliminação
          dos dados pessoais coletados dentro do escopo dos serviços e
          funcionalidades do SITE, buscando estar em conformidade com a Lei
          Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018.
        </p>

        <Section title="Seção 1 – O que faremos com suas informações?">
          <p>
            Quando você realiza alguma ação no nosso SITE, como preencher um
            formulário de contato, efetuar uma reserva online ou responder um
            feedback, coletamos informações pessoais que você, de forma
            consciente e explícita, nos fornece — tais como nome, e-mail,
            endereço e/ou outras.
          </p>
          <p>
            Quando você acessa nosso site, também recebemos automaticamente
            informações genéricas, como o protocolo de internet do seu
            computador (IP), a fim de obter informações que nos ajudam a
            entender sobre seu navegador e sistema operacional.
          </p>
          <p>
            E-mail marketing poderá ser realizado, mas apenas caso você permita.
            Nestes e-mails você receberá notícias sobre nossos serviços e outras
            atualizações. Poderemos recomendar produtos de parceiros, mas não
            enviaremos seus dados a estes.
          </p>
        </Section>

        <Section title="Seção 2 – Consentimento">
          <p>
            <strong>Como vocês obtêm meu consentimento?</strong> Quando você
            fornece informações pessoais como nome, telefone e endereço para
            completar uma ação (exemplo: preenche um formulário de contato e/ou
            realiza uma reserva). Após a realização dessas ações, entendemos que
            você está de acordo com a coleta de dados para uso pela nossa
            empresa.
          </p>
          <p>
            Se pedirmos suas informações pessoais por uma razão secundária (como
            marketing), vamos pedir diretamente o seu consentimento, ou lhe dar a
            oportunidade de recusar.
          </p>
          <p>
            Caso você queira retirar seu consentimento, pode fazê-lo a qualquer
            momento entrando em contato conosco pelo e-mail{" "}
            <a
              href={`mailto:${company.email}`}
              className="text-anil underline decoration-anil/30 hover:decoration-anil"
            >
              {company.email}
            </a>{" "}
            ou enviando correspondência para: {fullAddress()}.
          </p>
        </Section>

        <Section title="Seção 3 – Divulgação">
          <p>
            Podemos divulgar suas informações pessoais caso sejamos obrigados
            pela lei ou se você violar nossos Termos de Serviço. Não
            divulgaremos suas informações pessoais a terceiros em outras
            hipóteses senão as já citadas nesta seção.
          </p>
        </Section>

        <Section title="Seção 4 – Serviços de terceiros">
          <p>
            No geral, os fornecedores terceirizados usados por nós apenas
            coletam, usam e divulgam suas informações na medida do necessário
            para permitir que eles realizem os serviços que nos fornecem.
          </p>
          <p>
            Entretanto, certos fornecedores de serviços terceirizados, tais como
            gateways de pagamento e outros processadores de transação, têm suas
            próprias políticas de privacidade com respeito às informações que
            somos obrigados a fornecer a eles em transações relacionadas a
            reservas e pagamentos. Para esses fornecedores, recomendamos que você
            leia suas políticas de privacidade.
          </p>
          <p>
            Em particular, lembre-se que certos fornecedores podem estar
            localizados em jurisdições diferentes da sua ou da nossa. Assim, se
            você continuar com uma transação envolvendo os serviços de um
            fornecedor terceirizado, suas informações podem ficar sujeitas às
            leis da jurisdição em que esse fornecedor está localizado.
          </p>
          <p>
            Uma vez que você deixe nosso site ou seja redirecionado para um
            aplicativo/site de terceiros, você não estará mais coberto por esta
            Política de Privacidade.
          </p>
          <h3 className="font-semibold text-carvao mt-4">Links</h3>
          <p>
            Quando você clica em links no nosso site, eles podem lhe direcionar
            para fora do nosso ambiente. Não somos responsáveis pelas práticas de
            privacidade de outros sites e incentivamos a leitura das políticas de
            privacidade deles.
          </p>
          <h3 className="font-semibold text-carvao mt-4">Cookies</h3>
          <p>
            Utilizamos cookies para armazenar informações. Podem ser próprios
            (feitos por nós, como preferências pessoais na navegação) ou de
            terceiros (usados para melhorar a experiência e coletar dados para
            análises e marketing, como Google Analytics, Facebook e outros).
          </p>
          <p>
            Você pode visualizar quais cookies estão em uso através das opções do
            seu navegador, e tem o poder de desativá-los. Isso pode alterar a
            forma como você interage com nosso site e outros sites.
          </p>
        </Section>

        <Section title="Seção 5 – Segurança">
          <p>
            Para proteger suas informações pessoais, tomamos precauções
            razoáveis e seguimos as melhores práticas da indústria para garantir
            que elas não sejam perdidas indevidamente, usurpadas, acessadas,
            divulgadas, alteradas ou destruídas.
          </p>
        </Section>

        <Section title="Seção 6 – Alterações para essa Política de Privacidade">
          <p>
            Reservamos o direito de modificar esta política de privacidade a
            qualquer momento; por favor, revise-a com frequência. Alterações e
            esclarecimentos entram em vigor imediatamente após sua publicação no
            site. Caso façamos alterações materiais nesta política, iremos
            notificá-lo aqui sobre as atualizações, para que você saiba quais
            informações coletamos, como as usamos e sob quais circunstâncias.
          </p>
        </Section>

        <p className="text-sm text-grafite pt-4 border-t border-carvao/10">
          Esta política de privacidade foi alterada pela última vez em{" "}
          {company.privacyUpdatedAt}.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-4">
      <h2 className="font-display text-lg font-semibold text-carvao mb-2">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
