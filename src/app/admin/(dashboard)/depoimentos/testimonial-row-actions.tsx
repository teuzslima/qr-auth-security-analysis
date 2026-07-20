"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TestimonialRowActions({
  testimonialId,
  published,
}: {
  testimonialId: string;
  published: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleTogglePublish() {
    setLoading(true);
    await fetch(`/api/admin/testimonials/${testimonialId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("Excluir este depoimento? Essa ação não pode ser desfeita.")) return;
    setLoading(true);
    await fetch(`/api/admin/testimonials/${testimonialId}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={handleTogglePublish}
        disabled={loading}
        className="text-xs border rounded px-2 py-1 hover:bg-neutral-50 disabled:opacity-60"
      >
        {published ? "Despublicar" : "Publicar"}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-xs border border-red-200 text-red-600 rounded px-2 py-1 hover:bg-red-50 disabled:opacity-60"
      >
        Excluir
      </button>
    </div>
  );
}
