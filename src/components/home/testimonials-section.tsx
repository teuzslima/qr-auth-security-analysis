import Image from "next/image";
import { prisma } from "@/lib/prisma";

// TODO: pedir pra imobiliária 3-5 depoimentos reais (nome, foto, imóvel
// alugado) e publicar via Testimonial.published = true. Até lá, mostramos um
// aviso honesto em vez de inventar depoimento.
export async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-carvao text-center">
        Quem já alugou com a gente
      </h2>

      {testimonials.length === 0 ? (
        <div className="mt-8 border border-dashed border-carvao/25 rounded-xl p-8 text-center text-grafite max-w-lg mx-auto">
          Em breve, depoimentos de quem já alugou com a Muniz Imobiliária.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-carvao/10 rounded-xl p-5"
            >
              <p className="text-carvao text-sm italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3 mt-4">
                {t.photoUrl && (
                  <Image
                    src={t.photoUrl}
                    alt={t.authorName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm text-carvao">{t.authorName}</p>
                  {t.propertyCode && (
                    <p className="font-utility text-xs text-grafite">
                      Alugou o {t.propertyCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
