import { prisma } from "@/lib/prisma";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const statusLabels: Record<string, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
  REFUNDED: "Reembolsado",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
  REFUNDED: "bg-neutral-200 text-neutral-700",
};

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { reservation: { include: { property: true, renter: true } } },
  });

  const totalApproved = payments
    .filter((payment) => payment.status === "APPROVED")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Pagamentos</h2>
        <p className="text-sm text-neutral-600">
          Total recebido em cauções: <strong>{formatBRL(totalApproved)}</strong>
        </p>
      </div>
      <div className="bg-white border rounded-lg divide-y">
        {payments.length === 0 && (
          <p className="p-4 text-sm text-neutral-500">Nenhum pagamento registrado.</p>
        )}
        {payments.map((payment) => (
          <div key={payment.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{payment.reservation.property.title}</p>
              <p className="text-sm text-neutral-500">
                {payment.reservation.renter.name} · {payment.reservation.renter.email}
              </p>
              <p className="text-xs text-neutral-400">
                {payment.provider} · ID:{" "}
                {payment.providerPaymentId ?? "aguardando pagamento"} ·{" "}
                {payment.createdAt.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold">{formatBRL(payment.amount)}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  statusColors[payment.status] ?? "bg-neutral-100 text-neutral-700"
                }`}
              >
                {statusLabels[payment.status] ?? payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
