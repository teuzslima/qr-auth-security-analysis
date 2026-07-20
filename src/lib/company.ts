// Dados institucionais/legais reais da Muniz Imobiliária.
// São informações estáveis (razão social, CNPJ, matriz) usadas nas páginas
// institucionais (Quem Somos, Política de Privacidade) e no rodapé.
// O contato operacional (WhatsApp, horário, redes) fica em BusinessSettings,
// editável pelo admin.
export const company = {
  tradeName: "Muniz Imobiliária",
  legalName: "Josival Muniz - ME",
  cnpj: "05.013.039/0001-67",
  foundedYear: 2001,
  email: "ouvidoria@munizimobiliaria.com.br",
  phoneDisplay: "(75) 99873-5121",
  whatsapp: "5575998735121",
  address: {
    label: "Matriz",
    street: "Av. Gonçalo Prado Rollemberg, nº 933",
    neighborhood: "São José",
    city: "Aracaju",
    state: "SE",
    country: "Brasil",
  },
  privacyUpdatedAt: "18 de julho de 2026",
};

export function fullAddress() {
  const a = company.address;
  return `${a.street} - ${a.neighborhood} - ${a.city}/${a.state} - ${a.country}`;
}
