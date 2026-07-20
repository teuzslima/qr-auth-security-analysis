# Mapa de campos — Gerador de Contrato Muniz

Este arquivo lista **todos** os placeholders `{{campo}}` que aparecem em `modelo-contrato-template.md`, na ordem em que devem aparecer no formulário do admin. Use isto pra montar os campos, os tipos de input, as máscaras e os valores padrão. Cada `key` bate exatamente com o `{{key}}` do modelo.

> Alguns campos são **derivados** (o sistema calcula/gera, não digito): `aluguel_valor_extenso`, `caucao_valor_extenso` e `prazo_termino`. Estão marcados. Gere-os automaticamente, mas deixe eu editar.

---

## Bloco 1 — Locador

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `locador_nome` | Nome completo | texto | — | sim |
| `locador_nacionalidade` | Nacionalidade | texto | default "brasileiro(a)" | sim |
| `locador_estado_civil` | Estado civil | select | solteiro(a)/casado(a)/divorciado(a)/viúvo(a)/união estável | sim |
| `locador_profissao` | Profissão | texto | — | sim |
| `locador_rg` | RG | texto | — | sim |
| `locador_cpf` | CPF | texto | `000.000.000-00` + validação dígito | sim |
| `locador_endereco` | Endereço completo (com CEP) | texto | — | sim |
| `locador_telefone` | Telefone | texto | `(00) 00000-0000` | sim |
| `locador_email` | E-mail | email | validação e-mail | sim |

## Bloco 2 — Locatário (o cliente)

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `locatario_nome` | Nome completo | texto | — | sim |
| `locatario_nacionalidade` | Nacionalidade | texto | default "brasileiro(a)" | sim |
| `locatario_estado_civil` | Estado civil | select | mesmas opções do locador | sim |
| `locatario_profissao` | Profissão | texto | — | sim |
| `locatario_rg` | RG | texto | — | sim |
| `locatario_cpf` | CPF | texto | `000.000.000-00` + validação dígito | sim |
| `locatario_endereco` | Endereço atual (com CEP) | texto | — | sim |
| `locatario_telefone` | Telefone | texto | `(00) 00000-0000` | sim |
| `locatario_email` | E-mail | email | validação e-mail | sim |

## Bloco 3 — Imóvel

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `imovel_endereco` | Endereço completo do imóvel (nº, compl., bairro, cidade/UF, CEP) | texto | — | sim |
| `imovel_matricula` | Nº da matrícula | texto | — | não |
| `imovel_cartorio` | Cartório de Registro de Imóveis | texto | ex.: "1º Cartório de RI de Aracaju" | não |
| `imovel_inscricao_iptu` | Inscrição do IPTU | texto | — | não |

## Bloco 4 — Condições financeiras

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `aluguel_valor` | Valor do aluguel | dinheiro | `R$ 0.000,00` | sim |
| `aluguel_valor_extenso` | Valor por extenso | **derivado** | gerar do valor; editável | sim |
| `aluguel_vencimento` | Dia de vencimento | número | 1 a 31 | sim |
| `reajuste_indice` | Índice de reajuste | select | "IGP-M/FGV" / "IPCA/IBGE" | sim |
| `pagamento_forma` | Forma de pagamento | select | "transferência bancária" / "PIX" | sim |
| `pagamento_banco` | Banco | texto | — | não |
| `pagamento_agencia` | Agência | texto | — | não |
| `pagamento_conta` | Conta | texto | — | não |
| `pagamento_pix` | Chave PIX | texto | — | não |
| `pagamento_titular` | Titular da conta/PIX | texto | — | não |

> Os campos de banco só aparecem se forma = transferência; o campo PIX só aparece se forma = PIX. (Mostrar/esconder, não obrigatório os dois ao mesmo tempo.)

## Bloco 5 — Garantia (caução)

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `caucao_valor` | Valor da caução | dinheiro | `R$ 0.000,00` · **default R$ 300,00** | sim |
| `caucao_valor_extenso` | Valor por extenso | **derivado** | gerar do valor; editável | sim |
| `caucao_prazo_devolucao` | Prazo de devolução após entrega das chaves (dias) | número | default 30 | sim |

> **Alerta obrigatório:** se `caucao_valor` > 3 × `aluguel_valor`, mostrar aviso amarelo: *"A caução em dinheiro não pode passar de 3 aluguéis (art. 38, §2º da Lei 8.245/91)."* Não bloquear.

## Bloco 6 — Prazo

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `prazo_meses` | Duração (meses) | número | default 30 | sim |
| `prazo_inicio` | Data de início | data | `dd/mm/aaaa` | sim |
| `prazo_termino` | Data de término | **derivado** | calcular de início + meses; editável | sim |

## Bloco 7 — Outros campos fixos do fim

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `vistoria_prazo_ressalva` | Prazo p/ ressalvas de vistoria (dias) | número | default 5 | sim |
| `foro_comarca` | Comarca do foro | texto | default "Aracaju/SE" | sim |
| `assinatura_cidade` | Cidade da assinatura | texto | default "Aracaju/SE" | sim |
| `assinatura_data` | Data da assinatura (por extenso) | texto | default hoje, ex.: "20 de julho de 2026" | sim |

## Bloco 8 — Testemunhas (opcional, pode deixar em branco pra preencher à mão)

| key | label | tipo | máscara / regra | obrigatório |
|---|---|---|---|---|
| `testemunha1_nome` | Testemunha 1 — nome | texto | — | não |
| `testemunha1_cpf` | Testemunha 1 — CPF | texto | `000.000.000-00` | não |
| `testemunha2_nome` | Testemunha 2 — nome | texto | — | não |
| `testemunha2_cpf` | Testemunha 2 — CPF | texto | `000.000.000-00` | não |

---

## Regras gerais

- Todo `{{campo}}` não preenchido deve aparecer na **prévia** destacado em amarelo com o label legível (ex.: `[RG do locatário]`), nunca como `{{locatario_rg}}` cru.
- Campos **derivados** (`aluguel_valor_extenso`, `caucao_valor_extenso`, `prazo_termino`) são calculados automaticamente mas ficam editáveis — se eu mexer manualmente, respeite o que eu digitei.
- `locador_nome`, `locador_cpf`, `locatario_nome`, `locatario_cpf` aparecem **duas vezes** no contrato (qualificação + bloco de assinatura). Preencher uma vez, refletir nos dois lugares.
- Guarde este mapa e o `modelo-contrato-template.md` juntos em `lib/` — um define os campos, o outro o texto.
