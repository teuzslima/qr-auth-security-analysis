import { formatBRL, totalMensal } from "@/lib/format";

export function CostBreakdown({
  property,
  compact = false,
}: {
  property: { priceMonthly: number; condominio: number; iptu: number; depositAmount: number };
  compact?: boolean;
}) {
  const total = totalMensal(property);

  if (compact) {
    return (
      <div className="font-utility tabular-nums">
        <p className="text-xs text-grafite">Total mensal (aluguel + cond. + IPTU)</p>
        <p className="text-lg font-bold text-carvao">{formatBRL(total)}</p>
      </div>
    );
  }

  const rows = [
    { label: "Aluguel", value: property.priceMonthly },
    { label: "Condomínio", value: property.condominio },
    { label: "IPTU", value: property.iptu },
  ];

  return (
    <div className="font-utility tabular-nums border border-carvao/15 rounded-lg overflow-hidden">
      <div className="p-4 space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-sm text-carvao">
            <span>{row.label}</span>
            <span>{formatBRL(row.value)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-carvao/15 bg-cal px-4 py-3 flex justify-between items-baseline">
        <span className="text-sm font-semibold text-carvao">Total mensal</span>
        <span className="text-xl font-bold text-anil">{formatBRL(total)}</span>
      </div>
      <div className="bg-mangue text-white px-4 py-3 flex justify-between items-baseline">
        <span className="text-sm font-medium">Caução (garantia)</span>
        <span className="text-lg font-bold">{formatBRL(property.depositAmount)}</span>
      </div>
    </div>
  );
}
