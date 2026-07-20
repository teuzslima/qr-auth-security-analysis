"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MultiImageUploadField } from "@/components/admin/multi-image-upload-field";

export interface PropertyFormValues {
  codigo: string;
  type: "CASA" | "APARTAMENTO";
  status: "DISPONIVEL" | "RESERVADO" | "ALUGADO";
  title: string;
  description: string;
  address: string;
  bairro: string;
  city: string;
  state: string;
  priceMonthly: number;
  condominio: number;
  iptu: number;
  depositAmount: number;
  bedrooms: number;
  bathrooms: number;
  vagas: number;
  areaM2: number;
  andar: string;
  mobiliado: boolean;
  aceitaPet: boolean;
  floorPlanUrl: string;
  brokerId: string;
  photosText: string;
}

const emptyValues: PropertyFormValues = {
  codigo: "",
  type: "CASA",
  status: "DISPONIVEL",
  title: "",
  description: "",
  address: "",
  bairro: "",
  city: "Aracaju",
  state: "SE",
  priceMonthly: 0,
  condominio: 0,
  iptu: 0,
  depositAmount: 300,
  bedrooms: 0,
  bathrooms: 0,
  vagas: 0,
  areaM2: 0,
  andar: "",
  mobiliado: false,
  aceitaPet: false,
  floorPlanUrl: "",
  brokerId: "",
  photosText: "",
};

export function PropertyForm({
  propertyId,
  defaultValues,
  brokers,
}: {
  propertyId?: string;
  defaultValues?: PropertyFormValues;
  brokers: { id: string; name: string }[];
}) {
  const router = useRouter();
  const isEdit = Boolean(propertyId);
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
      isEdit ? `/api/admin/properties/${propertyId}` : "/api/admin/properties",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Erro ao salvar imóvel.");
      setLoading(false);
      return;
    }

    router.push("/admin/imoveis");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-5 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Código (ex: AJU-0142)"
          name="codigo"
          defaultValue={initial.codigo}
          required
        />
        <div>
          <label className="text-xs text-neutral-600">Status</label>
          <select
            name="status"
            defaultValue={initial.status}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="DISPONIVEL">Disponível</option>
            <option value="RESERVADO">Reservado</option>
            <option value="ALUGADO">Alugado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs text-neutral-600">Tipo</label>
        <select
          name="type"
          defaultValue={initial.type}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="CASA">Casa</option>
          <option value="APARTAMENTO">Apartamento</option>
        </select>
      </div>

      <Field label="Título" name="title" defaultValue={initial.title} required />
      <div>
        <label className="text-xs text-neutral-600">Descrição</label>
        <textarea
          name="description"
          required
          minLength={10}
          rows={3}
          defaultValue={initial.description}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <Field label="Endereço" name="address" defaultValue={initial.address} required />
      <div className="grid grid-cols-3 gap-3">
        <Field label="Bairro" name="bairro" defaultValue={initial.bairro} required />
        <Field label="Cidade" name="city" defaultValue={initial.city} required />
        <Field label="UF" name="state" defaultValue={initial.state} required maxLength={2} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Field
          label="Aluguel mensal (R$)"
          name="priceMonthly"
          type="number"
          defaultValue={initial.priceMonthly}
          required
        />
        <Field
          label="Condomínio (R$)"
          name="condominio"
          type="number"
          defaultValue={initial.condominio}
        />
        <Field label="IPTU (R$)" name="iptu" type="number" defaultValue={initial.iptu} />
      </div>
      <Field
        label="Caução (R$)"
        name="depositAmount"
        type="number"
        defaultValue={initial.depositAmount}
        required
      />

      <div className="grid grid-cols-4 gap-3">
        <Field
          label="Quartos"
          name="bedrooms"
          type="number"
          defaultValue={initial.bedrooms}
          required
        />
        <Field
          label="Banheiros"
          name="bathrooms"
          type="number"
          defaultValue={initial.bathrooms}
          required
        />
        <Field label="Vagas" name="vagas" type="number" defaultValue={initial.vagas} />
        <Field label="Andar (se apto)" name="andar" type="number" defaultValue={initial.andar} />
      </div>
      <Field
        label="Área (m²)"
        name="areaM2"
        type="number"
        defaultValue={initial.areaM2}
        required
      />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="mobiliado" defaultChecked={initial.mobiliado} />
          Mobiliado
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="aceitaPet" defaultChecked={initial.aceitaPet} />
          Aceita pet
        </label>
      </div>

      <div>
        <label className="text-xs text-neutral-600">Corretor responsável</label>
        <select
          name="brokerId"
          defaultValue={initial.brokerId}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">Nenhum</option>
          {brokers.map((broker) => (
            <option key={broker.id} value={broker.id}>
              {broker.name}
            </option>
          ))}
        </select>
      </div>

      <Field
        label="URL da planta baixa (opcional)"
        name="floorPlanUrl"
        type="url"
        defaultValue={initial.floorPlanUrl}
      />

      <MultiImageUploadField
        name="photosText"
        category="imoveis"
        label="Fotos do imóvel (sem fotos, aparece o placeholder &quot;foto em breve&quot;)"
        defaultValue={initial.photosText}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-700 text-white rounded px-3 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar imóvel"}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  defaultValue?: string | number;
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
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
