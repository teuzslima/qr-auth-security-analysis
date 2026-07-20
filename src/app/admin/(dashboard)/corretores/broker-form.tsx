"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export interface BrokerFormValues {
  name: string;
  creci: string;
  whatsapp: string;
  photoUrl: string;
}

const emptyValues: BrokerFormValues = { name: "", creci: "", whatsapp: "", photoUrl: "" };

export function BrokerForm({
  brokerId,
  defaultValues,
}: {
  brokerId?: string;
  defaultValues?: BrokerFormValues;
}) {
  const router = useRouter();
  const isEdit = Boolean(brokerId);
  const initial = defaultValues ?? emptyValues;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch(
      isEdit ? `/api/admin/brokers/${brokerId}` : "/api/admin/brokers",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Erro ao salvar corretor.");
      setLoading(false);
      return;
    }

    router.push("/admin/corretores");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-5 space-y-3">
      <ImageUploadField
        name="photoUrl"
        category="corretores"
        label="Foto"
        defaultValue={initial.photoUrl}
      />

      <div>
        <label className="text-xs text-neutral-600">Nome completo</label>
        <input
          name="name"
          required
          minLength={3}
          defaultValue={initial.name}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-neutral-600">CRECI</label>
          <input
            name="creci"
            required
            defaultValue={initial.creci}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-600">
            WhatsApp (DDI+DDD+número, só dígitos)
          </label>
          <input
            name="whatsapp"
            required
            minLength={10}
            placeholder="5579999999999"
            defaultValue={initial.whatsapp}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-700 text-white rounded px-3 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar corretor"}
      </button>
    </form>
  );
}
