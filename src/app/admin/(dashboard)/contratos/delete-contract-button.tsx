"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteContractButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm("Excluir este contrato? Esta ação não pode ser desfeita.")) return;
    setBusy(true);
    await fetch(`/api/admin/contracts/${id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      className="text-xs text-alerta hover:underline disabled:opacity-50"
    >
      Excluir
    </button>
  );
}
