"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BusinessSettings } from "@/lib/business-settings";

export function BusinessSettingsForm({ settings }: { settings: BusinessSettings }) {
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
    const payload = Object.fromEntries(form.entries());

    const response = await fetch("/api/admin/business-settings", {
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
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-5 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nome da imobiliária" name="name" defaultValue={settings.name} required />
        <Field label="CRECI (empresa)" name="creci" defaultValue={settings.creci} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="WhatsApp central (só números, com DDI+DDD)"
          name="whatsapp"
          defaultValue={settings.whatsapp}
          required
        />
        <Field
          label="Telefone (exibição)"
          name="phoneDisplay"
          defaultValue={settings.phoneDisplay}
          required
        />
      </div>

      <Field
        label="Endereço (rua e número)"
        name="addressStreet"
        defaultValue={settings.addressStreet}
      />
      <div className="grid grid-cols-3 gap-3">
        <Field
          label="Bairro"
          name="addressNeighborhood"
          defaultValue={settings.addressNeighborhood}
        />
        <Field label="Cidade" name="addressCity" defaultValue={settings.addressCity} required />
        <Field
          label="UF"
          name="addressState"
          defaultValue={settings.addressState}
          required
          maxLength={2}
        />
      </div>
      <Field label="CEP" name="addressZip" defaultValue={settings.addressZip} />

      <Field
        label="Horário de atendimento"
        name="hours"
        defaultValue={settings.hours}
        placeholder="Seg a sex, 8h às 18h"
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Instagram (URL, opcional)"
          name="instagramUrl"
          type="url"
          defaultValue={settings.instagramUrl ?? ""}
        />
        <Field
          label="Facebook (URL, opcional)"
          name="facebookUrl"
          type="url"
          defaultValue={settings.facebookUrl ?? ""}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Salvo com sucesso.</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-700 text-white rounded px-4 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-neutral-600">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
