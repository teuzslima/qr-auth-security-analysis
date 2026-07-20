// Renderização do contrato: preenche os {{placeholders}} do template e
// converte o markdown (subconjunto usado pelo modelo) em HTML.
// Campo vazio nunca aparece como "{{chave}}" cru — vira o rótulo legível
// destacado, ex.: [RG do locatário].

import { CONTRACT_TEMPLATE } from "./template";
import { FIELD_BY_KEY } from "./fields";
import type { ContractValues } from "./derive";

// Sentinelas internas para atravessar o escape de HTML sem colisão com texto.
const MISS_OPEN = "␂OPEN␂";
const MISS_CLOSE = "␂CLOSE␂";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Remove a linha de pagamento que não se aplica à forma escolhida — espelha o
 * mostrar/esconder do formulário (mapa: banco só em transferência, PIX só em
 * PIX). Enquanto a forma não é escolhida, mantém as duas.
 */
function stripUnusedPaymentLine(template: string, forma: string): string {
  const lines = template.split("\n");
  return lines
    .filter((line) => {
      if (forma === "PIX" && /^- Banco:/.test(line.trim())) return false;
      if (forma === "transferência bancária" && /^- Chave PIX:/.test(line.trim())) return false;
      return true;
    })
    .join("\n");
}

/** Preenche o template; placeholders vazios viram sentinela com o rótulo legível. */
export function fillTemplate(values: ContractValues): string {
  const template = stripUnusedPaymentLine(CONTRACT_TEMPLATE, (values.pagamento_forma ?? "").trim());
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = (values[key] ?? "").trim();
    if (value) return value;
    const label = FIELD_BY_KEY[key]?.previewLabel ?? key;
    return `${MISS_OPEN}${label}${MISS_CLOSE}`;
  });
}

function inline(text: string): string {
  let out = escapeHtml(text);
  // markdown inline: negrito antes de itálico
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // <br> literal do template (já escapado acima)
  out = out.replace(/&lt;br&gt;/g, "<br>");
  // sentinela de campo vazio → destaque amarelo
  out = out.replace(
    new RegExp(`${MISS_OPEN}([^␂]*)${MISS_CLOSE}`, "g"),
    '<mark class="contract-missing">[$1]</mark>',
  );
  return out;
}

/**
 * Converte o markdown preenchido em HTML. Cobre o subconjunto usado pelo
 * modelo: h1/h2, ---, parágrafos, blockquote, listas com "-", tabelas e <br>.
 */
export function renderContractHtml(values: ContractValues): string {
  const md = fillTemplate(values);
  const lines = md.split("\n");
  const html: string[] = [];

  let paragraph: string[] = [];
  let list: string[] | null = null;
  let table: string[][] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      html.push(`<ul>${list.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
      list = null;
    }
  };
  const flushTable = () => {
    if (table) {
      const rows = table
        .map((cells) => `<tr>${cells.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
        .join("");
      html.push(`<table><tbody>${rows}</tbody></table>`);
      table = null;
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushTable();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("|")) {
      flushParagraph();
      flushList();
      const cells = trimmed
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      // pula separadores (|---|---|) e linhas de cabeçalho vazias
      if (cells.every((c) => /^:?-{3,}:?$/.test(c))) continue;
      if (cells.every((c) => c === "")) continue;
      (table ??= []).push(cells);
      continue;
    }
    flushTable();

    if (trimmed === "") {
      flushAll();
      continue;
    }
    if (trimmed === "---") {
      flushAll();
      html.push("<hr>");
      continue;
    }
    if (trimmed === "<br>") {
      flushAll();
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushAll();
      html.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushAll();
      html.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("> ")) {
      flushAll();
      html.push(`<blockquote>${inline(trimmed.slice(2))}</blockquote>`);
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flushParagraph();
      (list ??= []).push(trimmed.slice(2));
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushAll();

  return html.join("\n");
}

/** Título de listagem no admin, derivado dos dados: "Locatário — endereço". */
export function contractDisplayTitle(values: ContractValues): string {
  const locatario = (values.locatario_nome ?? "").trim();
  const endereco = (values.imovel_endereco ?? "").trim();
  if (locatario && endereco) return `${locatario} — ${endereco}`;
  return locatario || endereco || "Contrato sem dados";
}
