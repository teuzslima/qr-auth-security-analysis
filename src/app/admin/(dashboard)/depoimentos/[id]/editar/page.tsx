import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../../testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) {
    notFound();
  }

  return (
    <section className="max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Editar depoimento</h2>
      <TestimonialForm
        testimonialId={testimonial.id}
        defaultValues={{
          authorName: testimonial.authorName,
          photoUrl: testimonial.photoUrl ?? "",
          propertyCode: testimonial.propertyCode ?? "",
          quote: testimonial.quote,
          published: testimonial.published,
        }}
      />
    </section>
  );
}
