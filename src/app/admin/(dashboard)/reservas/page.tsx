import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  PENDING_PAYMENT: "Aguardando pagamento",
  PAYMENT_CONFIRMED: "Pagamento confirmado",
  CONTRACT_SIGNED: "Contrato assinado",
  CANCELLED: "Cancelada",
};

const statusColors: Record<string, string> = {
  PENDING_PAYMENT: "bg-amber-100 text-amber-700",
  PAYMENT_CONFIRMED: "bg-blue-100 text-blue-700",
  CONTRACT_SIGNED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    include: { property: true, renter: true, payment: true },
  });

  return (
    <section>
      <h2 className="font-semibold mb-3">Reservas</h2>
      <div className="bg-white border rounded-lg divide-y">
        {reservations.length === 0 && (
          <p className="p-4 text-sm text-neutral-500">Nenhuma reserva ainda.</p>
        )}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{reservation.property.title}</p>
              <p className="text-sm text-neutral-500">
                {reservation.renter.name} · {reservation.renter.email} ·{" "}
                {reservation.renter.phone ?? "sem telefone"}
              </p>
              <p className="text-xs text-neutral-400">
                Reservado em {reservation.createdAt.toLocaleString("pt-BR")}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                statusColors[reservation.status] ?? "bg-neutral-100 text-neutral-700"
              }`}
            >
              {statusLabels[reservation.status] ?? reservation.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
