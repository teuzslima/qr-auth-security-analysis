"use client";

import { useMemo } from "react";
import { renderContractHtml } from "@/lib/contract/render";
import type { ContractValues } from "@/lib/contract/derive";

// Prévia ao vivo do contrato. O HTML é gerado por renderContractHtml, que já
// escapa os valores do usuário — os campos vazios saem como <mark> destacado.
export function ContractPreview({ values }: { values: ContractValues }) {
  const html = useMemo(() => renderContractHtml(values), [values]);

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="border-b px-4 py-2 text-xs text-neutral-500 flex items-center justify-between">
        <span>Prévia do contrato</span>
        <span className="text-neutral-400">
          Campos em <mark className="contract-missing">amarelo</mark> ainda faltam
        </span>
      </div>
      <div
        className="contract-document p-6 max-h-[75vh] overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
