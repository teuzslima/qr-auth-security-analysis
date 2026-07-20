import { prisma } from "@/lib/prisma";

export async function PropertySearchForm({
  action = "/imoveis",
  defaultBairro,
  defaultQuartos,
  defaultMax,
}: {
  action?: string;
  defaultBairro?: string;
  defaultQuartos?: string;
  defaultMax?: string;
}) {
  const bairros = await prisma.property.findMany({
    distinct: ["bairro"],
    select: { bairro: true },
    orderBy: { bairro: "asc" },
  });

  return (
    <form
      action={action}
      method="get"
      className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-carvao/10"
    >
      <select
        name="bairro"
        defaultValue={defaultBairro ?? ""}
        aria-label="Bairro"
        className="border border-carvao/20 rounded-md px-3 py-2.5 text-sm min-h-11 bg-white"
      >
        <option value="">Todos os bairros</option>
        {bairros.map(({ bairro }) => (
          <option key={bairro} value={bairro}>
            {bairro}
          </option>
        ))}
      </select>

      <select
        name="quartos"
        defaultValue={defaultQuartos ?? ""}
        aria-label="Quartos"
        className="border border-carvao/20 rounded-md px-3 py-2.5 text-sm min-h-11 bg-white"
      >
        <option value="">Quartos</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>

      <input
        type="number"
        name="max"
        defaultValue={defaultMax}
        placeholder="Até quanto? (R$)"
        aria-label="Preço máximo"
        className="border border-carvao/20 rounded-md px-3 py-2.5 text-sm min-h-11"
      />

      <button
        type="submit"
        className="bg-anil text-white rounded-md px-4 py-2.5 text-sm font-semibold hover:bg-anil-escuro min-h-11"
      >
        Buscar imóveis
      </button>
    </form>
  );
}
