import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TestimonialRowActions } from "./testimonial-row-actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Depoimentos</h2>
        <Link
          href="/admin/depoimentos/novo"
          className="text-sm bg-emerald-700 text-white rounded px-3 py-1.5 hover:bg-emerald-800"
        >
          + Novo depoimento
        </Link>
      </div>
      <div className="bg-white border rounded-lg divide-y">
        {testimonials.length === 0 && (
          <p className="p-4 text-sm text-neutral-500">Nenhum depoimento cadastrado.</p>
        )}
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <p className="font-medium">{testimonial.authorName}</p>
              <p className="text-sm text-neutral-500 line-clamp-1">
                &quot;{testimonial.quote}&quot;
              </p>
              {testimonial.propertyCode && (
                <p className="text-xs text-neutral-400 font-mono">
                  {testimonial.propertyCode}
                </p>
              )}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                testimonial.published
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {testimonial.published ? "Publicado" : "Rascunho"}
            </span>
            <Link
              href={`/admin/depoimentos/${testimonial.id}/editar`}
              className="text-xs border rounded px-2 py-1 hover:bg-neutral-50 shrink-0"
            >
              Editar
            </Link>
            <TestimonialRowActions
              testimonialId={testimonial.id}
              published={testimonial.published}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
