// Máscaras, validações e campos derivados do gerador de contrato.
// Usado tanto no formulário (client) quanto na renderização (server) —
// não importe nada de servidor aqui (prisma etc.).

import { ALL_FIELDS } from "./fields";
import { valorPorExtenso } from "./extenso";

export type ContractValues = Record<string, string>;

/** Chave reservada no Json `data`: derivados que o admin editou à mão. */
export const OVERRIDES_KEY = "__overrides";

// ---------------------------------------------------------------------------
// Máscaras (aplicadas enquanto digita)
// ---------------------------------------------------------------------------

export function maskCpf(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Dinheiro digitado como centavos: "150000" → "1.500,00". */
export function maskMoney(raw: string): string {
  const d = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 12);
  if (!d) return "";
  const cents = d.padStart(3, "0");
  const int = cents.slice(0, -2);
  const frac = cents.slice(-2);
  return `${Number(int).toLocaleString("pt-BR")},${frac}`;
}

export function maskDate(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

// ---------------------------------------------------------------------------
// Parsing e validação
// ---------------------------------------------------------------------------

/** "1.500,00" → 1500. NaN se vazio/inválido. */
export function parseMoney(masked: string): number {
  if (!masked.trim()) return NaN;
  return Number(masked.replace(/\./g, "").replace(",", "."));
}

/** Validação dos dígitos verificadores do CPF. Só valida quando completo. */
export function isValidCpf(masked: string): boolean {
  const d = masked.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (const pos of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < pos; i++) sum += Number(d[i]) * (pos + 1 - i);
    const check = ((sum * 10) % 11) % 10;
    if (check !== Number(d[pos])) return false;
  }
  return true;
}

/** "dd/mm/aaaa" → Date (ou null). */
export function parseDateBR(masked: string): Date | null {
  const m = masked.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (date.getDate() !== Number(dd) || date.getMonth() !== Number(mm) - 1) return null;
  return date;
}

export function formatDateBR(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** "20 de julho de 2026" */
export function dataPorExtenso(date: Date): string {
  return `${date.getDate()} de ${MESES[date.getMonth()]} de ${date.getFullYear()}`;
}

// ---------------------------------------------------------------------------
// Derivados e defaults
// ---------------------------------------------------------------------------

/** Valores iniciais de um contrato novo (defaults estáticos + dinâmicos). */
export function defaultValues(): ContractValues {
  const values: ContractValues = {};
  for (const field of ALL_FIELDS) {
    if (field.defaultValue) values[field.key] = field.defaultValue;
  }
  values.assinatura_data = dataPorExtenso(new Date());
  return values;
}

/**
 * Recalcula os campos derivados a partir dos digitados, respeitando os que o
 * admin editou manualmente (lista em `overrides`).
 */
export function applyDerived(values: ContractValues, overrides: string[]): ContractValues {
  const next = { ...values };

  if (!overrides.includes("aluguel_valor_extenso")) {
    const v = parseMoney(next.aluguel_valor ?? "");
    next.aluguel_valor_extenso = Number.isNaN(v) ? "" : valorPorExtenso(v);
  }
  if (!overrides.includes("caucao_valor_extenso")) {
    const v = parseMoney(next.caucao_valor ?? "");
    next.caucao_valor_extenso = Number.isNaN(v) ? "" : valorPorExtenso(v);
  }
  if (!overrides.includes("prazo_termino")) {
    const inicio = parseDateBR(next.prazo_inicio ?? "");
    const meses = Number(next.prazo_meses ?? "");
    if (inicio && Number.isInteger(meses) && meses > 0) {
      const fim = new Date(inicio);
      fim.setMonth(fim.getMonth() + meses);
      fim.setDate(fim.getDate() - 1); // início + N meses − 1 dia
      next.prazo_termino = formatDateBR(fim);
    } else {
      next.prazo_termino = "";
    }
  }

  return next;
}

/** Aviso legal: caução acima de 3 aluguéis (não bloqueia). */
export function caucaoExcedeLimite(values: ContractValues): boolean {
  const aluguel = parseMoney(values.aluguel_valor ?? "");
  const caucao = parseMoney(values.caucao_valor ?? "");
  return !Number.isNaN(aluguel) && !Number.isNaN(caucao) && caucao > 3 * aluguel;
}
