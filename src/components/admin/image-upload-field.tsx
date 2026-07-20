"use client";

import { useState } from "react";

export function ImageUploadField({
  name,
  category,
  label,
  defaultValue = "",
}: {
  name: string;
  category: "corretores" | "depoimentos";
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error ?? `Erro ao enviar imagem (${response.status}).`);
        return;
      }

      setUrl(data.url);
    } catch {
      setError("Não foi possível enviar a imagem. Verifique a conexão e tente de novo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="text-xs text-neutral-600">{label}</label>
      <div className="flex items-center gap-3 mt-1">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="Pré-visualização"
            className="w-16 h-16 rounded-full object-cover border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-neutral-100 border flex items-center justify-center text-[10px] text-neutral-400 text-center">
            Sem foto
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="text-xs"
          />
          {uploading && <p className="text-xs text-neutral-500 mt-1">Enviando...</p>}
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
