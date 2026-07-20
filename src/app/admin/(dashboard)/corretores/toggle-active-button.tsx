"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ToggleActiveButton({
  brokerId,
  active,
}: {
  brokerId: string;
  active: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    await fetch(`/api/admin/brokers/${brokerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-xs border rounded px-2 py-1 hover:bg-neutral-50 disabled:opacity-60"
    >
      {active ? "Desativar" : "Ativar"}
    </button>
  );
}
