import { WhatsAppLink } from "@/components/whatsapp-link";
import { buildInterestMessage, buildVisitMessage } from "@/lib/whatsapp";
import type { WhatsAppPropertyContext } from "@/lib/whatsapp";

export function PropertyStickyCta({
  imovel,
  phone,
}: {
  imovel: WhatsAppPropertyContext;
  phone: string;
}) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-carvao/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-4xl grid grid-cols-2 gap-3">
        <WhatsAppLink
          message={buildVisitMessage(imovel)}
          origin="ficha_agendar_visita"
          codigo={imovel.codigo}
          phone={phone}
          className="flex items-center justify-center border-2 border-anil text-anil font-semibold rounded-full px-4 py-3 min-h-11 text-sm hover:bg-anil/5"
        >
          Agendar visita
        </WhatsAppLink>
        <WhatsAppLink
          message={buildInterestMessage(imovel)}
          origin="ficha_tenho_interesse"
          codigo={imovel.codigo}
          phone={phone}
          className="flex items-center justify-center bg-mangue text-white font-semibold rounded-full px-4 py-3 min-h-11 text-sm hover:bg-mangue-escuro"
        >
          Tenho interesse
        </WhatsAppLink>
      </div>
    </div>
  );
}
