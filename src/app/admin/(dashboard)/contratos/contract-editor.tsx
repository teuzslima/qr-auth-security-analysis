"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CONTRACT_BLOCKS,
  type ContractField,
} from "@/lib/contract/fields";
import {
  applyDerived,
  caucaoExcedeLimite,
  isValidCpf,
  maskCpf,
  maskDate,
  maskMoney,
  maskPhone,
  type ContractValues,
} from "@/lib/contract/derive";
import { ContractPreview } from "./contract-preview";

interface Props {
  contractId?: string;
  initialValues: ContractValues;
  initialOverrides: string[];
}

const DERIVED_HINT: Record<string, string> = {
  aluguel_valor_extenso: "Gerado do valor. Edite se precisar ajustar.",
  caucao_valor_extenso: "Gerado do valor. Edite se precisar ajustar.",
  prazo_termino: "Calculado de início + duração. Edite se precisar ajustar.",
};

export function ContractEditor({ contractId, initialValues, initialOverrides }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<ContractValues>(initialValues);
  const [overrides, setOverrides] = useState<string[]>(initialOverrides);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedInfo, setSavedInfo] = useState<{ token: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Todos os valores já com derivados aplicados (respeitando overrides).
  const derivedValues = useMemo(
    () => applyDerived(values, overrides),
    [values, overrides],
  );

  const caucaoAlerta = caucaoExcedeLimite(derivedValues);

  function applyMask(field: ContractField, raw: string): string {
    switch (field.type) {
      case "cpf":
        return maskCpf(raw);
      case "phone":
        return maskPhone(raw);
      case "money":
        return maskMoney(raw);
      case "date":
        return maskDate(raw);
      default:
        return raw;
    }
  }

  function setField(field: ContractField, raw: string) {
    const masked = applyMask(field, raw);
    setValues((prev) => ({ ...prev, [field.key]: masked }));
    // Editar um derivado à mão passa a respeitá-lo; editar um input-fonte
    // devolve o controle do derivado ao cálculo automático.
    if (field.derived) {
      setOverrides((prev) => (prev.includes(field.key) ? prev : [...prev, field.key]));
    }
  }

  function resetDerived(key: string) {
    setOverrides((prev) => prev.filter((k) => k !== key));
  }

  function isVisible(field: ContractField): boolean {
    if (!field.showIf) return true;
    return (values[field.showIf.key] ?? "") === field.showIf.equals;
  }

  async function save() {
    setSaving(true);
    setError(null);
    setCopied(false);
    const payload = { data: { ...derivedValues, __overrides: overrides } };
    const url = contractId ? `/api/admin/contracts/${contractId}` : "/api/admin/contracts";
    const method = contractId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao salvar.");
        setSaving(false);
        return;
      }
      if (!contractId && data.id) {
        router.push(`/admin/contratos/${data.id}/editar`);
        router.refresh();
        return;
      }
      setSavedInfo({ token: data.token ?? savedInfo?.token ?? "" });
      setSaving(false);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Formulário */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 sticky top-0 bg-cal/95 backdrop-blur py-2 z-10">
          <button
            onClick={save}
            disabled={saving}
            className="bg-mangue text-white rounded px-4 py-2 text-sm font-medium hover:bg-mangue-escuro disabled:opacity-60"
          >
            {saving ? "Salvando..." : contractId ? "Salvar alterações" : "Criar contrato"}
          </button>
          {error && <span className="text-sm text-alerta">{error}</span>}
          {savedInfo && !error && (
            <span className="text-sm text-mangue-escuro">Salvo.</span>
          )}
        </div>

        {caucaoAlerta && (
          <p className="text-xs bg-amber-50 text-amber-800 border border-amber-200 rounded p-3">
            A caução em dinheiro não pode passar de 3 aluguéis (art. 38, §2º da
            Lei 8.245/91). Confira o valor.
          </p>
        )}

        {CONTRACT_BLOCKS.map((block) => (
          <fieldset key={block.title} className="border rounded-lg bg-white p-4">
            <legend className="px-2 text-sm font-semibold text-anil-escuro">
              {block.title}
            </legend>
            {block.note && (
              <p className="text-xs text-neutral-500 mb-3">{block.note}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {block.fields.filter(isVisible).map((field) => (
                <FieldInput
                  key={field.key}
                  field={field}
                  value={values[field.key] ?? derivedValues[field.key] ?? ""}
                  onChange={(raw) => setField(field, raw)}
                  onResetDerived={() => resetDerived(field.key)}
                  overridden={overrides.includes(field.key)}
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Preview + link */}
      <div className="lg:sticky lg:top-4 space-y-3">
        {contractId && (
          <ShareLink token={savedInfo?.token ?? null} copied={copied} setCopied={setCopied} />
        )}
        <ContractPreview values={derivedValues} />
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  onResetDerived,
  overridden,
}: {
  field: ContractField;
  value: string;
  onChange: (raw: string) => void;
  onResetDerived: () => void;
  overridden: boolean;
}) {
  const cpfInvalid = field.type === "cpf" && value.replace(/\D/g, "").length === 11 && !isValidCpf(value);
  const wide = field.type === "text" && field.key.includes("endereco");

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="text-xs text-neutral-600 flex items-center gap-2">
        {field.label}
        {field.required && <span className="text-alerta">*</span>}
        {field.derived && (
          <span className="text-[10px] uppercase tracking-wide text-anil">derivado</span>
        )}
      </label>

      {field.type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm bg-white"
        >
          <option value="">Selecione…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {field.type === "money" && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
              R$
            </span>
          )}
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            inputMode={
              field.type === "money" || field.type === "number"
                ? "numeric"
                : field.type === "phone" || field.type === "cpf" || field.type === "date"
                  ? "numeric"
                  : undefined
            }
            placeholder={field.type === "date" ? "dd/mm/aaaa" : undefined}
            type={field.type === "number" ? "number" : "text"}
            min={field.min}
            max={field.max}
            className={`w-full border rounded px-3 py-2 text-sm ${
              field.type === "money" ? "pl-9" : ""
            } ${cpfInvalid ? "border-alerta" : ""}`}
          />
        </div>
      )}

      {cpfInvalid && <p className="text-[11px] text-alerta mt-0.5">CPF inválido.</p>}
      {field.derived && overridden && (
        <button
          type="button"
          onClick={onResetDerived}
          className="text-[11px] text-anil hover:underline mt-0.5"
        >
          Recalcular automaticamente
        </button>
      )}
      {field.derived && !overridden && DERIVED_HINT[field.key] && (
        <p className="text-[11px] text-neutral-400 mt-0.5">{DERIVED_HINT[field.key]}</p>
      )}
    </div>
  );
}

function ShareLink({
  token,
  copied,
  setCopied,
}: {
  token: string | null;
  copied: boolean;
  setCopied: (v: boolean) => void;
}) {
  const url =
    token && typeof window !== "undefined"
      ? `${window.location.origin}/contrato/${token}`
      : null;

  if (!url) {
    return (
      <div className="bg-white border rounded-lg p-4 text-xs text-neutral-500">
        Salve o contrato para gerar o link de assinatura.
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-xs font-semibold text-anil-escuro mb-1">
        Link para o locatário assinar
      </p>
      <div className="flex gap-2">
        <input
          readOnly
          value={url}
          className="flex-1 border rounded px-2 py-1 text-xs text-neutral-700 bg-neutral-50"
          onFocus={(e) => e.target.select()}
        />
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="bg-anil text-white rounded px-3 py-1 text-xs font-medium hover:bg-anil-escuro whitespace-nowrap"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] text-anil hover:underline mt-1 inline-block"
      >
        Abrir a página de assinatura →
      </a>
    </div>
  );
}
