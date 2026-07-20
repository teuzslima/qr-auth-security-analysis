import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ToggleActiveButton } from "./toggle-active-button";

export default async function AdminBrokersPage() {
  const brokers = await prisma.broker.findMany({ orderBy: { name: "asc" } });

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Corretores</h2>
        <Link
          href="/admin/corretores/novo"
          className="text-sm bg-emerald-700 text-white rounded px-3 py-1.5 hover:bg-emerald-800"
        >
          + Novo corretor
        </Link>
      </div>
      <div className="bg-white border rounded-lg divide-y">
        {brokers.length === 0 && (
          <p className="p-4 text-sm text-neutral-500">Nenhum corretor cadastrado.</p>
        )}
        {brokers.map((broker) => (
          <div key={broker.id} className="p-4 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={broker.photoUrl}
              alt={broker.name}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <p className="font-medium">{broker.name}</p>
              <p className="text-sm text-neutral-500">
                CRECI {broker.creci} · WhatsApp: {broker.whatsapp}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                broker.active
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {broker.active ? "Ativo" : "Inativo"}
            </span>
            <Link
              href={`/admin/corretores/${broker.id}/editar`}
              className="text-xs border rounded px-2 py-1 hover:bg-neutral-50 shrink-0"
            >
              Editar
            </Link>
            <ToggleActiveButton brokerId={broker.id} active={broker.active} />
          </div>
        ))}
      </div>
    </section>
  );
}
