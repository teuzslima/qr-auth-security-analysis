// Helpers de servidor para os contratos gerados (GeneratedContract).
import { prisma } from "@/lib/prisma";
import { ALL_FIELDS } from "./fields";
import { OVERRIDES_KEY, applyDerived, type ContractValues } from "./derive";

/**
 * Normaliza o `data` vindo do cliente: mantém só chaves conhecidas (+ a lista
 * de overrides), força string e recalcula os derivados no servidor — a fonte
 * da verdade do PDF/assinatura nunca depende do que o browser mandou.
 */
export function normalizeData(input: unknown): { values: ContractValues; overrides: string[] } {
  const raw = (input ?? {}) as Record<string, unknown>;
  const overrides = Array.isArray(raw[OVERRIDES_KEY])
    ? (raw[OVERRIDES_KEY] as unknown[]).filter((k): k is string => typeof k === "string")
    : [];

  const values: ContractValues = {};
  for (const field of ALL_FIELDS) {
    const v = raw[field.key];
    if (typeof v === "string") values[field.key] = v;
  }

  const derived = applyDerived(values, overrides);
  return { values: derived, overrides };
}

/** Empacota values + overrides no formato guardado em Prisma.Json. */
export function packData(values: ContractValues, overrides: string[]): Record<string, string | string[]> {
  return { ...values, [OVERRIDES_KEY]: overrides };
}

/** Lê o Prisma.Json de volta para values + overrides. */
export function unpackData(data: unknown): { values: ContractValues; overrides: string[] } {
  return normalizeData(data);
}

export async function getContractByToken(token: string) {
  return prisma.generatedContract.findUnique({ where: { token } });
}

export async function getContractById(id: string) {
  return prisma.generatedContract.findUnique({ where: { id } });
}

export async function listContracts() {
  return prisma.generatedContract.findMany({ orderBy: { updatedAt: "desc" } });
}
