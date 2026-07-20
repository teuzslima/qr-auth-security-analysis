import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SignForm } from "./sign-form";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: { renter: true },
  });

  if (!reservation) {
    notFound();
  }

  if (reservation.status === "PENDING_PAYMENT") {
    redirect(`/reservas/${id}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Revisão e assinatura do contrato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg overflow-hidden bg-white" style={{ height: 500 }}>
          <iframe
            src={`/api/contracts/${id}/pdf`}
            className="w-full h-full"
            title="Contrato de locação"
          />
        </div>

        <div className="bg-white border rounded-lg p-5 h-fit">
          {reservation.status === "CONTRACT_SIGNED" ? (
            <p className="text-emerald-700 font-medium">
              Este contrato já foi assinado.
            </p>
          ) : (
            <SignForm
              reservationId={id}
              defaultName={reservation.renter.name}
              defaultCpf={reservation.renter.cpf ?? ""}
            />
          )}
        </div>
      </div>
    </div>
  );
}
