"use client";

import { useState } from "react";

export function MultiImageUploadField({
  name,
  category,
  label,
  defaultValue = "",
}: {
  name: string;
  category: "imoveis";
  label: string;
  defaultValue?: string; // URLs separadas por quebra de linha
}) {
  const [urls, setUrls] = useState<string[]>(
    defaultValue
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean),
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    const newUrls: string[] = [];
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setError(data.error ?? `Erro ao enviar imagem (${response.status}).`);
          return;
        }
        newUrls.push(data.url);
      }
      setUrls((prev) => [...prev, ...newUrls]);
      event.target.value = "";
    } catch {
      setError("Não foi possível enviar a imagem. Verifique a conexão e tente de novo.");
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="text-xs text-neutral-600">{label}</label>

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {urls.map((url, i) => (
            <div key={url} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Foto ${i + 1}`}
                className="w-20 h-20 rounded object-cover border"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs leading-none flex items-center justify-center"
                aria-label="Remover foto"
              >
                ×
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-emerald-700 text-white text-[9px] text-center py-0.5 rounded-b">
                  capa
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileChange}
          className="text-xs"
        />
        {uploading && <p className="text-xs text-neutral-500 mt-1">Enviando...</p>}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        <p className="text-[11px] text-neutral-400 mt-1">
          A primeira foto é a capa. Você pode enviar várias de uma vez (até 4MB cada).
        </p>
      </div>

      <input type="hidden" name={name} value={urls.join("\n")} />
    </div>
  );
}
