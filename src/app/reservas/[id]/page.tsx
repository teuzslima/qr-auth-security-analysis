import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ReservationStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: { property: true, renter: true, payment: true, contract: true },
  });

  if (!reservation) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">Sua reserva</h1>
      <p className="text-neutral-600 mb-6">{reservation.property.title}</p>

      <div className="bg-white border rounded-lg p-5 space-y-4">
        <StatusStep
          done
          title="Reserva criada"
          description={`Caução: ${formatBRL(reservation.depositAmount)}`}
        />

        <StatusStep
          done={reservation.payment?.status === "APPROVED"}
          pending={reservation.payment?.status !== "APPROVED"}
          title="Pagamento da caução"
          description={
            reservation.payment?.status === "APPROVED"
              ? "Pagamento confirmado."
              : reservation.payment?.status === "REJECTED"
                ? "Pagamento rejeitado. Entre em contato com a imobiliária."
                : "Aguardando confirmação do pagamento pelo Mercado Pago."
          }
        />

        <StatusStep
          done={reservation.status === "CONTRACT_SIGNED"}
          pending={reservation.status === "PAYMENT_CONFIRMED"}
          disabled={reservation.status === "PENDING_PAYMENT"}
          title="Assinatura do contrato"
          description={
            reservation.status === "CONTRACT_SIGNED"
              ? `Assinado em ${reservation.contract?.signedAt?.toLocaleString("pt-BR")}`
              : reservation.status === "PAYMENT_CONFIRMED"
                ? "Pronto para assinar o contrato."
                : "Disponível após confirmação do pagamento."
          }
        />

        {reservation.status === "PAYMENT_CONFIRMED" && (
          <Link
            href={`/reservas/${reservation.id}/contrato`}
            className="block text-center bg-emerald-700 text-white rounded px-3 py-2 text-sm font-medium hover:bg-emerald-800"
          >
            Revisar e assinar contrato
          </Link>
        )}

        {reservation.status === "CONTRACT_SIGNED" && (
          <a
            href={`/api/contracts/${reservation.id}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center border border-emerald-700 text-emerald-700 rounded px-3 py-2 text-sm font-medium hover:bg-emerald-50"
          >
            Baixar contrato assinado (PDF)
          </a>
        )}
      </div>
    </div>
  );
}

function StatusStep({
  title,
  description,
  done,
  pending,
  disabled,
}: {
  title: string;
  description: string;
  done?: boolean;
  pending?: boolean;
  disabled?: boolean;
}) {
  const color = done
    ? "bg-emerald-600"
    : pending
      ? "bg-amber-500"
      : disabled
        ? "bg-neutral-300"
        : "bg-neutral-300";

  return (
    <div className="flex gap-3">
      <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${color}`} />
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
}
