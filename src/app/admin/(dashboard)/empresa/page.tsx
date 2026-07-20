import { getBusinessSettings } from "@/lib/business-settings";
import { BusinessSettingsForm } from "./business-settings-form";

export default async function AdminBusinessSettingsPage() {
  const settings = await getBusinessSettings();

  return (
    <section className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">Dados da imobiliária</h2>
      <p className="text-sm text-neutral-500 mb-4">
        Essas informações aparecem no cabeçalho, rodapé e nos botões de
        WhatsApp do site — inclusive o mapa do rodapé usa o endereço abaixo.
      </p>
      <BusinessSettingsForm settings={settings} />
    </section>
  );
}
