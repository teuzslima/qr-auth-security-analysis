"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignForm({
  reservationId,
  defaultName,
  defaultCpf,
}: {
  reservationId: string;
  defaultName: string;
  defaultCpf: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      signerName: String(form.get("signerName") ?? ""),
      signerCpf: String(form.get("signerCpf") ?? ""),
      agree: form.get("agree") === "on",
    };

    if (!payload.agree) {
      setError("Você precisa concordar com os termos do contrato para assinar.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/contracts/${reservationId}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Não foi possível assinar o contrato.");
        setLoading(false);
        return;
      }

      router.push(`/reservas/${reservationId}`);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-neutral-600">
        Leia o contrato ao lado. Ao assinar, ficam registrados seu nome, CPF,
        data/hora e endereço IP como aceite eletrônico deste contrato.
      </p>
      <div>
        <label className="text-xs text-neutral-600">Nome completo (para assinatura)</label>
        <input
          name="signerName"
          required
          minLength={3}
          defaultValue={defaultName}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600">CPF</label>
        <input
          name="signerCpf"
          required
          minLength={11}
          defaultValue={defaultCpf}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="agree" className="mt-1" />
        Li e concordo com os termos do contrato de locação acima.
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-700 text-white rounded px-3 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Assinando..." : "Assinar contrato"}
      </button>
    </form>
  );
}
