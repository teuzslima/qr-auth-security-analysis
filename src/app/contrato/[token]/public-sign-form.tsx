"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidCpf, maskCpf } from "@/lib/contract/derive";

export function PublicSignForm({
  token,
  defaultName,
  defaultCpf,
}: {
  token: string;
  defaultName: string;
  defaultCpf: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [cpf, setCpf] = useState(maskCpf(defaultCpf));
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cpfInvalid = cpf.replace(/\D/g, "").length === 11 && !isValidCpf(cpf);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 3) return setError("Informe seu nome completo.");
    if (!isValidCpf(cpf)) return setError("CPF inválido.");
    if (!agree) return setError("Você precisa aceitar os termos para assinar.");

    setLoading(true);
    try {
      const res = await fetch(`/api/sign/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signerName: name.trim(), signerCpf: cpf, agree: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Não foi possível assinar.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="text-sm text-neutral-600">
        Leia o contrato acima. Ao assinar, ficam registrados seu nome, CPF,
        data/hora e endereço IP como aceite eletrônico deste contrato (MP nº
        2.200-2/2001).
      </p>
      <div>
        <label className="text-xs text-neutral-600">Nome completo</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600">CPF</label>
        <input
          value={cpf}
          onChange={(e) => setCpf(maskCpf(e.target.value))}
          inputMode="numeric"
          className={`w-full border rounded px-3 py-2 text-sm ${cpfInvalid ? "border-alerta" : ""}`}
          required
        />
        {cpfInvalid && <p className="text-[11px] text-alerta mt-0.5">CPF inválido.</p>}
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1"
        />
        Li e concordo com os termos do contrato de locação acima.
      </label>

      {error && <p className="text-sm text-alerta">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-mangue text-white rounded px-3 py-2 text-sm font-medium hover:bg-mangue-escuro disabled:opacity-60"
      >
        {loading ? "Assinando..." : "Assinar contrato"}
      </button>
    </form>
  );
}
