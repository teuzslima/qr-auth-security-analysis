import type { Metadata } from "next";
import { Zilla_Slab, Public_Sans, Archivo } from "next/font/google";
import "./globals.css";
import { getBusinessSettings } from "@/lib/business-settings";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button";

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

// Todo o site depende de dados vivos do banco (imóveis, corretores, dados
// da empresa, sessão do admin) — nada aqui deve virar HTML estático gerado
// no build. Sem isso, a Vercel tenta acessar o banco durante o build (onde
// não há garantia de rede/variáveis de ambiente) em vez de a cada request.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const business = await getBusinessSettings();

  return {
    metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
    title: {
      default: `${business.name} — Aluguel de casas e apartamentos em ${business.addressCity}`,
      template: `%s — ${business.name}`,
    },
    description: `Encontre casas e apartamentos para alugar em ${business.addressCity}. Custo total transparente e garantia facilitada. Fale direto no WhatsApp.`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const business = await getBusinessSettings();

  return (
    <html
      lang="pt-BR"
      className={`${zillaSlab.variable} ${publicSans.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloatButton businessName={business.name} whatsapp={business.whatsapp} />
      </body>
    </html>
  );
}
