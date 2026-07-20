"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export interface TestimonialFormValues {
  authorName: string;
  photoUrl: string;
  propertyCode: string;
  quote: string;
  published: boolean;
}

const emptyValues: TestimonialFormValues = {
  authorName: "",
  photoUrl: "",
  propertyCode: "",
  quote: "",
  published: false,
};

export function TestimonialForm({
  testimonialId,
  defaultValues,
}: {
  testimonialId?: string;
  defaultValues?: TestimonialFormValues;
}) {
  const router = useRouter();
  const isEdit = Boolean(testimonialId);
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
      isEdit ? `/api/admin/testimonials/${testimonialId}` : "/api/admin/testimonials",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Erro ao salvar depoimento.");
      setLoading(false);
      return;
    }

    router.push("/admin/depoimentos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-5 space-y-3">
      <ImageUploadField
        name="photoUrl"
        category="depoimentos"
        label="Foto (opcional)"
        defaultValue={initial.photoUrl}
      />

      <div>
        <label className="text-xs text-neutral-600">Nome de quem alugou</label>
        <input
          name="authorName"
          required
          minLength={3}
          defaultValue={initial.authorName}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-neutral-600">Código do imóvel alugado (opcional)</label>
        <input
          name="propertyCode"
          placeholder="AJU-0142"
          defaultValue={initial.propertyCode}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-neutral-600">Depoimento</label>
        <textarea
          name="quote"
          required
          minLength={10}
          rows={4}
          defaultValue={initial.quote}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={initial.published} />
        Publicar no site
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-700 text-white rounded px-3 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar depoimento"}
      </button>
    </form>
  );
}
