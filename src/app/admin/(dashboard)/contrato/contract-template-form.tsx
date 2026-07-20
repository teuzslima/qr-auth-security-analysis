"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ContractTemplateForm({
  defaultLandlordName,
  defaultRentDueDay,
  defaultTermsText,
}: {
  defaultLandlordName: string;
  defaultRentDueDay: number;
  defaultTermsText: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      landlordName: String(form.get("landlordName") ?? ""),
      rentDueDay: Number(form.get("rentDueDay") ?? 5),
      termsText: String(form.get("termsText") ?? ""),
    };

    const response = await fetch("/api/admin/contract-template", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Erro ao salvar.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-xs text-neutral-600">Nome da imobiliária (locador)</label>
        <input
          name="landlordName"
          required
          minLength={2}
          defaultValue={defaultLandlordName}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600">Dia de vencimento do aluguel</label>
        <input
          name="rentDueDay"
          type="number"
          min={1}
          max={28}
          required
          defaultValue={defaultRentDueDay}
          className="w-32 border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600">
          Cláusulas gerais (prazo, reajuste, rescisão, foro, etc.)
        </label>
        <textarea
          name="termsText"
          required
          minLength={10}
          rows={8}
          defaultValue={defaultTermsText}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Modelo salvo com sucesso.</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-700 text-white rounded px-4 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Salvando..." : "Salvar modelo"}
      </button>
    </form>
  );
}
