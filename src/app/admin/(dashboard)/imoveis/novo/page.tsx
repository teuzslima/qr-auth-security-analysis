import { prisma } from "@/lib/prisma";
import { PropertyForm } from "../property-form";

export default async function NewPropertyPage() {
  const brokers = await prisma.broker.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <section className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Cadastrar novo imóvel</h2>
      <PropertyForm brokers={brokers} />
    </section>
  );
}
