import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BrokerForm } from "../../broker-form";

export default async function EditBrokerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const broker = await prisma.broker.findUnique({ where: { id } });

  if (!broker) {
    notFound();
  }

  return (
    <section className="max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Editar corretor</h2>
      <BrokerForm brokerId={broker.id} defaultValues={broker} />
    </section>
  );
}
