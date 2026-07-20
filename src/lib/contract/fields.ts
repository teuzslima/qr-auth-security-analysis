// Definição dos campos do gerador de contrato — espelha, bloco a bloco,
// o mapa-campos-contrato.md (mesmo diretório). Cada `key` bate exatamente
// com um {{placeholder}} de template.ts.

export type FieldType =
  | "text"
  | "email"
  | "select"
  | "money"
  | "number"
  | "date"
  | "cpf"
  | "phone";

export interface ContractField {
  key: string;
  /** Rótulo do campo no formulário do admin. */
  label: string;
  /** Rótulo legível exibido na prévia quando o campo está vazio, ex.: "RG do locatário". */
  previewLabel: string;
  type: FieldType;
  required: boolean;
  /** Opções quando type === "select". */
  options?: string[];
  /** Valor inicial. Datas dinâmicas (hoje) são resolvidas em derive.ts. */
  defaultValue?: string;
  /** Campo calculado pelo sistema (mas editável — edição manual é respeitada). */
  derived?: boolean;
  /** Exibir somente quando outro campo tiver determinado valor. */
  showIf?: { key: string; equals: string };
  /** Limites para type === "number". */
  min?: number;
  max?: number;
}

export interface ContractBlock {
  title: string;
  note?: string;
  fields: ContractField[];
}

const ESTADO_CIVIL = [
  "solteiro(a)",
  "casado(a)",
  "divorciado(a)",
  "viúvo(a)",
  "união estável",
];

function pessoa(prefix: "locador" | "locatario", quem: string): ContractField[] {
  return [
    { key: `${prefix}_nome`, label: "Nome completo", previewLabel: `Nome do ${quem}`, type: "text", required: true },
    { key: `${prefix}_nacionalidade`, label: "Nacionalidade", previewLabel: `Nacionalidade do ${quem}`, type: "text", required: true, defaultValue: "brasileiro(a)" },
    { key: `${prefix}_estado_civil`, label: "Estado civil", previewLabel: `Estado civil do ${quem}`, type: "select", required: true, options: ESTADO_CIVIL },
    { key: `${prefix}_profissao`, label: "Profissão", previewLabel: `Profissão do ${quem}`, type: "text", required: true },
    { key: `${prefix}_rg`, label: "RG", previewLabel: `RG do ${quem}`, type: "text", required: true },
    { key: `${prefix}_cpf`, label: "CPF", previewLabel: `CPF do ${quem}`, type: "cpf", required: true },
    {
      key: `${prefix}_endereco`,
      label: prefix === "locador" ? "Endereço completo (com CEP)" : "Endereço atual (com CEP)",
      previewLabel: `Endereço do ${quem}`,
      type: "text",
      required: true,
    },
    { key: `${prefix}_telefone`, label: "Telefone", previewLabel: `Telefone do ${quem}`, type: "phone", required: true },
    { key: `${prefix}_email`, label: "E-mail", previewLabel: `E-mail do ${quem}`, type: "email", required: true },
  ];
}

export const CONTRACT_BLOCKS: ContractBlock[] = [
  {
    title: "Locador",
    fields: pessoa("locador", "locador"),
  },
  {
    title: "Locatário",
    note: "O cliente que vai alugar o imóvel.",
    fields: pessoa("locatario", "locatário"),
  },
  {
    title: "Imóvel",
    fields: [
      {
        key: "imovel_endereco",
        label: "Endereço completo do imóvel (nº, compl., bairro, cidade/UF, CEP)",
        previewLabel: "Endereço do imóvel",
        type: "text",
        required: true,
      },
      { key: "imovel_matricula", label: "Nº da matrícula", previewLabel: "Matrícula do imóvel", type: "text", required: false },
      {
        key: "imovel_cartorio",
        label: "Cartório de Registro de Imóveis",
        previewLabel: "Cartório de Registro de Imóveis",
        type: "text",
        required: false,
      },
      { key: "imovel_inscricao_iptu", label: "Inscrição do IPTU", previewLabel: "Inscrição do IPTU", type: "text", required: false },
    ],
  },
  {
    title: "Condições financeiras",
    fields: [
      { key: "aluguel_valor", label: "Valor do aluguel", previewLabel: "Valor do aluguel", type: "money", required: true },
      {
        key: "aluguel_valor_extenso",
        label: "Valor do aluguel por extenso",
        previewLabel: "Valor do aluguel por extenso",
        type: "text",
        required: true,
        derived: true,
      },
      { key: "aluguel_vencimento", label: "Dia de vencimento", previewLabel: "Dia de vencimento", type: "number", required: true, min: 1, max: 31 },
      {
        key: "reajuste_indice",
        label: "Índice de reajuste",
        previewLabel: "Índice de reajuste",
        type: "select",
        required: true,
        options: ["IGP-M/FGV", "IPCA/IBGE"],
      },
      {
        key: "pagamento_forma",
        label: "Forma de pagamento",
        previewLabel: "Forma de pagamento",
        type: "select",
        required: true,
        options: ["transferência bancária", "PIX"],
      },
      { key: "pagamento_banco", label: "Banco", previewLabel: "Banco", type: "text", required: false, showIf: { key: "pagamento_forma", equals: "transferência bancária" } },
      { key: "pagamento_agencia", label: "Agência", previewLabel: "Agência", type: "text", required: false, showIf: { key: "pagamento_forma", equals: "transferência bancária" } },
      { key: "pagamento_conta", label: "Conta", previewLabel: "Conta", type: "text", required: false, showIf: { key: "pagamento_forma", equals: "transferência bancária" } },
      { key: "pagamento_pix", label: "Chave PIX", previewLabel: "Chave PIX", type: "text", required: false, showIf: { key: "pagamento_forma", equals: "PIX" } },
      { key: "pagamento_titular", label: "Titular da conta/PIX", previewLabel: "Titular da conta", type: "text", required: false },
    ],
  },
  {
    title: "Garantia (caução)",
    note: "A caução em dinheiro não pode passar de 3 aluguéis (art. 38, §2º da Lei 8.245/91).",
    fields: [
      { key: "caucao_valor", label: "Valor da caução", previewLabel: "Valor da caução", type: "money", required: true, defaultValue: "300,00" },
      {
        key: "caucao_valor_extenso",
        label: "Valor da caução por extenso",
        previewLabel: "Valor da caução por extenso",
        type: "text",
        required: true,
        derived: true,
      },
      {
        key: "caucao_prazo_devolucao",
        label: "Prazo de devolução após entrega das chaves (dias)",
        previewLabel: "Prazo de devolução da caução",
        type: "number",
        required: true,
        defaultValue: "30",
        min: 1,
      },
    ],
  },
  {
    title: "Prazo",
    fields: [
      { key: "prazo_meses", label: "Duração (meses)", previewLabel: "Duração em meses", type: "number", required: true, defaultValue: "30", min: 1 },
      { key: "prazo_inicio", label: "Data de início", previewLabel: "Data de início", type: "date", required: true },
      {
        key: "prazo_termino",
        label: "Data de término",
        previewLabel: "Data de término",
        type: "date",
        required: true,
        derived: true,
      },
    ],
  },
  {
    title: "Assinatura e foro",
    fields: [
      {
        key: "vistoria_prazo_ressalva",
        label: "Prazo p/ ressalvas de vistoria (dias)",
        previewLabel: "Prazo para ressalvas de vistoria",
        type: "number",
        required: true,
        defaultValue: "5",
        min: 1,
      },
      { key: "foro_comarca", label: "Comarca do foro", previewLabel: "Comarca do foro", type: "text", required: true, defaultValue: "Aracaju/SE" },
      { key: "assinatura_cidade", label: "Cidade da assinatura", previewLabel: "Cidade da assinatura", type: "text", required: true, defaultValue: "Aracaju/SE" },
      {
        key: "assinatura_data",
        label: "Data da assinatura (por extenso)",
        previewLabel: "Data da assinatura",
        type: "text",
        required: true,
        // default dinâmico (hoje por extenso) resolvido em derive.ts
      },
    ],
  },
  {
    title: "Testemunhas",
    note: "Opcional — pode deixar em branco para preencher à mão.",
    fields: [
      { key: "testemunha1_nome", label: "Testemunha 1 — nome", previewLabel: "Nome da testemunha 1", type: "text", required: false },
      { key: "testemunha1_cpf", label: "Testemunha 1 — CPF", previewLabel: "CPF da testemunha 1", type: "cpf", required: false },
      { key: "testemunha2_nome", label: "Testemunha 2 — nome", previewLabel: "Nome da testemunha 2", type: "text", required: false },
      { key: "testemunha2_cpf", label: "Testemunha 2 — CPF", previewLabel: "CPF da testemunha 2", type: "cpf", required: false },
    ],
  },
];

export const ALL_FIELDS: ContractField[] = CONTRACT_BLOCKS.flatMap((b) => b.fields);

export const FIELD_BY_KEY: Record<string, ContractField> = Object.fromEntries(
  ALL_FIELDS.map((f) => [f.key, f]),
);

export const DERIVED_KEYS = ALL_FIELDS.filter((f) => f.derived).map((f) => f.key);
