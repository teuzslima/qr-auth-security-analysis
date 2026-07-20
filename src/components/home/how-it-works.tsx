const steps = [
  { n: 1, title: "Escolha", text: "Veja o imóvel, o custo total e chame no WhatsApp com o código." },
  { n: 2, title: "Visita", text: "Combine um horário com o corretor responsável pelo imóvel." },
  { n: 3, title: "Documentos", text: "RG, comprovante de renda e a garantia combinada (caução, fiador ou seguro-fiança)." },
  { n: 4, title: "Chaves", text: "Contrato assinado, chaves na mão. Casa nova." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-carvao text-center">
        Como funciona
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.n} className="text-center sm:text-left">
            <span className="font-utility inline-flex items-center justify-center w-10 h-10 rounded-full bg-anil text-white font-bold text-lg">
              {step.n}
            </span>
            <p className="font-display font-semibold text-carvao mt-3">{step.title}</p>
            <p className="text-sm text-grafite mt-1">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
