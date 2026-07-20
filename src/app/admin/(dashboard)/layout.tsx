import Link from "next/link";
import { LogoutButton } from "./logout-button";

const navItems = [
  { href: "/admin/imoveis", label: "Imóveis" },
  { href: "/admin/corretores", label: "Corretores" },
  { href: "/admin/depoimentos", label: "Depoimentos" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/pagamentos", label: "Pagamentos" },
  { href: "/admin/contratos", label: "Contratos" },
  { href: "/admin/contrato", label: "Modelo" },
  { href: "/admin/empresa", label: "Empresa" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Painel administrativo</h1>
        <LogoutButton />
      </div>

      <nav className="flex gap-1 mb-6 border-b">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 text-sm text-neutral-600 hover:text-emerald-700 border-b-2 border-transparent hover:border-emerald-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
