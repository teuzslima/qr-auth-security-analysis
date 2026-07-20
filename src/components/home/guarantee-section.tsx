import Link from "next/link";

export function GuaranteeSection() {
  return (
    <section className="bg-mangue text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 text-center">
        <p className="font-utility uppercase tracking-widest text-sm text-white/80">
          Por que alugar com a Muniz
        </p>
        <p className="font-display text-2xl sm:text-4xl font-bold mt-3 max-w-2xl mx-auto leading-snug">
          Garantia facilitada, do jeito que couber pra você.
        </p>
        <p className="mt-4 max-w-xl mx-auto text-white/90">
          Caução, fiador, seguro-fiança ou título de capitalização — a gente
          encontra a forma de garantia certa pro seu caso. Sempre no contrato,
          sempre transparente.
        </p>
        <Link
          href="/caucao"
          className="inline-block mt-5 text-sm font-semibold underline decoration-white/50 hover:decoration-white"
        >
          Entenda como funciona a caução →
        </Link>
      </div>
    </section>
  );
}
