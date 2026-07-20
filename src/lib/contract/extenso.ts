// Valor monetário por extenso em pt-BR, para as cláusulas do contrato.
// Ex.: 1500 → "um mil e quinhentos reais"; 300.5 → "trezentos reais e cinquenta centavos".

const UNIDADES = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const DEZ_A_DEZENOVE = [
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
];
const DEZENAS = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
const CENTENAS = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos",
];

/** 1..999 por extenso. */
function trioPorExtenso(n: number): string {
  if (n === 100) return "cem";
  const c = Math.floor(n / 100);
  const resto = n % 100;
  const partes: string[] = [];
  if (c > 0) partes.push(CENTENAS[c]);
  if (resto > 0) {
    if (resto < 10) partes.push(UNIDADES[resto]);
    else if (resto < 20) partes.push(DEZ_A_DEZENOVE[resto - 10]);
    else {
      const d = Math.floor(resto / 10);
      const u = resto % 10;
      partes.push(u > 0 ? `${DEZENAS[d]} e ${UNIDADES[u]}` : DEZENAS[d]);
    }
  }
  return partes.join(" e ");
}

interface Escala {
  singular: string;
  plural: string;
  valor: number;
}

const ESCALAS: Escala[] = [
  { singular: "bilhão", plural: "bilhões", valor: 1_000_000_000 },
  { singular: "milhão", plural: "milhões", valor: 1_000_000 },
  { singular: "mil", plural: "mil", valor: 1_000 },
];

export function inteiroPorExtenso(n: number): string {
  n = Math.floor(Math.abs(n));
  if (n === 0) return "zero";

  const partes: { texto: string; valor: number }[] = [];
  for (const escala of ESCALAS) {
    const quantos = Math.floor(n / escala.valor);
    if (quantos > 0) {
      const texto =
        escala.valor === 1000 && quantos === 1
          ? "mil" // norma culta: "mil", não "um mil"
          : `${trioPorExtenso(quantos)} ${quantos === 1 ? escala.singular : escala.plural}`;
      partes.push({ texto, valor: quantos * escala.valor });
      n %= escala.valor;
    }
  }
  if (n > 0) partes.push({ texto: trioPorExtenso(n), valor: n });

  if (partes.length === 1) return partes[0].texto;
  // Regra do "e" entre grupos: usa " e " antes do último grupo quando ele é
  // menor que cem ou é "redondo" (termina em 00) — ex.: "mil e cem",
  // "dois milhões e quinhentos mil", mas "mil, duzentos e trinta e quatro".
  const ultimo = partes[partes.length - 1];
  const iniciais = partes.slice(0, -1).map((p) => p.texto);
  const usaE = ultimo.valor < 100 || ultimo.valor % 100 === 0;
  return usaE ? `${iniciais.join(", ")} e ${ultimo.texto}` : `${iniciais.join(", ")}, ${ultimo.texto}`;
}

/** Valor em reais por extenso: 1234.56 → "um mil, duzentos e trinta e quatro reais e cinquenta e seis centavos". */
export function valorPorExtenso(valor: number): string {
  if (!Number.isFinite(valor) || valor < 0) return "";
  let reais = Math.floor(valor);
  let centavos = Math.round((valor - reais) * 100);
  if (centavos === 100) {
    reais += 1;
    centavos = 0;
  }

  const partes: string[] = [];
  if (reais > 0) {
    const extenso = inteiroPorExtenso(reais);
    // "de reais" após milhão/bilhão redondos: "um milhão de reais"
    const precisaDe = reais >= 1_000_000 && reais % 1_000_000 === 0;
    partes.push(`${extenso}${precisaDe ? " de" : ""} ${reais === 1 ? "real" : "reais"}`);
  }
  if (centavos > 0) {
    partes.push(`${inteiroPorExtenso(centavos)} ${centavos === 1 ? "centavo" : "centavos"}`);
  }
  if (partes.length === 0) return "zero reais";
  return partes.join(" e ");
}
