"use client";

export function PrintButton({ label = "Imprimir / Salvar PDF" }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="bg-anil text-white rounded px-4 py-2 text-sm font-medium hover:bg-anil-escuro"
    >
      {label}
    </button>
  );
}
