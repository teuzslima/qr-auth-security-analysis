// Texto integral do contrato de locação residencial (Lei 8.245/91).
// Fonte canônica: modelo-contrato-template.md (mesmo diretório). Se editar o
// .md, regenere esta constante — os {{placeholders}} batem com fields.ts.
export const CONTRACT_TEMPLATE = `# CONTRATO DE LOCAÇÃO RESIDENCIAL

*Regido pela Lei nº 8.245/1991 (Lei do Inquilinato) e, subsidiariamente, pelo Código Civil.*

---

## QUALIFICAÇÃO DAS PARTES

**LOCADOR(A):** {{locador_nome}}, {{locador_nacionalidade}}, {{locador_estado_civil}}, {{locador_profissao}}, portador(a) do RG nº {{locador_rg}}, inscrito(a) no CPF sob nº {{locador_cpf}}, residente e domiciliado(a) em {{locador_endereco}}, telefone {{locador_telefone}}, e-mail {{locador_email}}.

**LOCATÁRIO(A):** {{locatario_nome}}, {{locatario_nacionalidade}}, {{locatario_estado_civil}}, {{locatario_profissao}}, portador(a) do RG nº {{locatario_rg}}, inscrito(a) no CPF sob nº {{locatario_cpf}}, residente e domiciliado(a) em {{locatario_endereco}}, telefone {{locatario_telefone}}, e-mail {{locatario_email}}.

As partes acima qualificadas têm entre si justo e contratado o presente Contrato de Locação Residencial, que se regerá pelas cláusulas seguintes:

---

## CLÁUSULA 1ª — DO OBJETO

O LOCADOR dá em locação ao LOCATÁRIO o imóvel residencial situado à {{imovel_endereco}}, inscrito na matrícula nº {{imovel_matricula}} do {{imovel_cartorio}}, com inscrição municipal (IPTU) nº {{imovel_inscricao_iptu}}.

**Parágrafo único.** O imóvel destina-se **exclusivamente ao uso residencial** do LOCATÁRIO e de seus familiares, sendo vedada qualquer atividade comercial, industrial ou de natureza diversa, salvo autorização prévia e por escrito do LOCADOR.

---

## CLÁUSULA 2ª — DO PRAZO

A presente locação vigorará pelo prazo de **{{prazo_meses}} meses**, com início em **{{prazo_inicio}}** e término em **{{prazo_termino}}**, independentemente de aviso, notificação ou interpelação judicial ou extrajudicial.

**§ 1º.** Findo o prazo e permanecendo o LOCATÁRIO no imóvel sem oposição do LOCADOR por mais de 30 (trinta) dias, a locação prorrogar-se-á automaticamente **por prazo indeterminado**, mantidas as demais cláusulas deste contrato.

**§ 2º.** Vigorando por prazo indeterminado, qualquer das partes poderá denunciar a locação mediante aviso por escrito com antecedência mínima de **30 (trinta) dias**.

---

## CLÁUSULA 3ª — DO ALUGUEL E DO REAJUSTE

O aluguel mensal é de **R$ {{aluguel_valor}} ({{aluguel_valor_extenso}})**, a ser pago até o dia **{{aluguel_vencimento}}** de cada mês, referente ao mês vincendo.

**§ 1º.** O pagamento será efetuado por {{pagamento_forma}} à conta abaixo, servindo o comprovante como recibo de quitação:
- Banco: {{pagamento_banco}} | Agência: {{pagamento_agencia}} | Conta: {{pagamento_conta}}
- Chave PIX: {{pagamento_pix}} | Titular: {{pagamento_titular}}

**§ 2º.** O valor do aluguel será reajustado **anualmente**, ou na menor periodicidade permitida em lei, pela variação acumulada do **{{reajuste_indice}}**. Na extinção ou impossibilidade de aplicação do índice, será adotado o que legalmente o substituir.

**§ 3º.** O atraso no pagamento sujeitará o LOCATÁRIO a **multa moratória de 2% (dois por cento)** sobre o valor em atraso, acrescida de **juros de mora de 1% (um por cento) ao mês**, calculados *pro rata die*, além de correção monetária pelo índice desta cláusula.

---

## CLÁUSULA 4ª — DOS ENCARGOS E TRIBUTOS

Correrão por conta exclusiva do **LOCATÁRIO**, além do aluguel:

a) Consumo de **energia elétrica**, **água/esgoto** e **gás**;
b) **IPTU** e taxas municipais incidentes sobre o imóvel;
c) **Despesas ordinárias de condomínio** (art. 23, XII, da Lei 8.245/91), quando houver;
d) Prêmio de **seguro contra incêndio**, se contratado;
e) Serviços de telefonia, internet e TV por assinatura eventualmente contratados.

**Parágrafo único.** Permanecem a cargo do **LOCADOR** as **despesas extraordinárias de condomínio** (art. 22, parágrafo único, da Lei 8.245/91), tais como obras de reforma que interessem à estrutura integral do imóvel, pintura de fachadas, instalação de equipamentos de segurança e constituição de fundo de reserva.

---

## CLÁUSULA 5ª — DA GARANTIA (CAUÇÃO EM DINHEIRO)

Em garantia das obrigações assumidas neste contrato, o LOCATÁRIO deposita, neste ato, a título de **caução em dinheiro**, a quantia de **R$ {{caucao_valor}} ({{caucao_valor_extenso}})**, na forma do art. 37, I, da Lei nº 8.245/1991.

**§ 1º.** Nos termos do art. 38, § 2º, da Lei nº 8.245/1991, a caução em dinheiro **não poderá exceder o equivalente a 3 (três) meses de aluguel** e será **depositada em caderneta de poupança**, autorizada, desde já, a movimentação pelo LOCADOR na forma deste contrato. A quantia reverterá em benefício do LOCATÁRIO ao final da locação, **acrescida dos rendimentos da poupança**.

**§ 2º.** A caução será restituída ao LOCATÁRIO no prazo de **{{caucao_prazo_devolucao}} dias** contados da entrega das chaves, **desde que** o imóvel seja devolvido nas condições da Cláusula 7ª e estejam quitados aluguéis, encargos e tributos.

**§ 3º.** Fica o LOCADOR autorizado a **descontar da caução** os valores correspondentes a aluguéis e encargos em aberto, multas contratuais e reparos de danos causados ao imóvel, mediante **apresentação de orçamento ou nota fiscal** ao LOCATÁRIO, restituindo-se o saldo remanescente, se houver.

**§ 4º.** A caução **não substitui** o pagamento dos aluguéis, sendo vedado ao LOCATÁRIO pretender compensá-la com os últimos meses de locação, salvo acordo expresso e por escrito entre as partes.

> **Atenção:** a Lei 8.245/91 (art. 37, parágrafo único) **veda a exigência cumulativa de mais de uma modalidade de garantia** no mesmo contrato. Se houver caução, não pode haver fiador nem seguro-fiança simultaneamente — escolha apenas uma.

---

## CLÁUSULA 6ª — DO ESTADO DO IMÓVEL E DA VISTORIA

O LOCATÁRIO declara receber o imóvel em **perfeito estado de conservação, limpeza, pintura e funcionamento**, conforme **Laudo de Vistoria de Entrada** que integra este contrato como **Anexo I**, devidamente assinado por ambas as partes e acompanhado de registro fotográfico.

**Parágrafo único.** Eventuais divergências quanto ao estado do imóvel deverão ser apontadas por escrito ao LOCADOR no prazo de **{{vistoria_prazo_ressalva}} dias** contados da entrega das chaves, sob pena de presunção de concordância integral com o laudo.

---

## CLÁUSULA 7ª — DA CONSERVAÇÃO E DA DEVOLUÇÃO

O LOCATÁRIO obriga-se a conservar o imóvel como se seu fosse, restituindo-o, ao final da locação, **no mesmo estado em que o recebeu**, salvo as deteriorações decorrentes do uso normal, conforme atestará o **Laudo de Vistoria de Saída**.

**§ 1º.** São de responsabilidade do LOCATÁRIO os reparos de **danos por ele causados** ou por seus dependentes, visitantes ou prepostos, bem como a **manutenção rotineira** (torneiras, sifões, lâmpadas, fechaduras, etc.).

**§ 2º.** São de responsabilidade do LOCADOR os **vícios ou defeitos anteriores à locação** e os reparos de natureza **estrutural**, salvo se decorrentes de mau uso pelo LOCATÁRIO.

**§ 3º.** O LOCATÁRIO **não poderá realizar benfeitorias ou modificações** no imóvel sem prévia e expressa autorização por escrito do LOCADOR. As **benfeitorias úteis ou voluptuárias** realizadas sem autorização **não serão indenizáveis** e **não geram direito de retenção**, podendo o LOCADOR exigir a reposição ao estado anterior.

---

## CLÁUSULA 8ª — DA VISTORIA DURANTE A LOCAÇÃO

O LOCATÁRIO permitirá a vistoria do imóvel pelo LOCADOR ou por seu representante, mediante **agendamento prévio com antecedência mínima de 48 (quarenta e oito) horas**, em dia e hora que não prejudiquem a rotina do LOCATÁRIO.

---

## CLÁUSULA 9ª — DA CESSÃO, SUBLOCAÇÃO E EMPRÉSTIMO

São **vedadas** a cessão, a sublocação total ou parcial e o empréstimo do imóvel, a qualquer título, sem o **consentimento prévio e por escrito** do LOCADOR, sob pena de rescisão contratual e aplicação da multa da Cláusula 11ª.

---

## CLÁUSULA 10ª — DA ALIENAÇÃO DO IMÓVEL E DO DIREITO DE PREFERÊNCIA

Em caso de venda do imóvel, será assegurado ao LOCATÁRIO o **direito de preferência**, em igualdade de condições com terceiros, nos termos dos arts. 27 a 34 da Lei nº 8.245/1991, devendo o LOCADOR notificá-lo por escrito, com todas as condições do negócio, cabendo ao LOCATÁRIO manifestar-se no prazo de **30 (trinta) dias**.

---

## CLÁUSULA 11ª — DA RESCISÃO E DA MULTA

O descumprimento de qualquer cláusula deste contrato autoriza a parte inocente a **rescindi-lo de pleno direito**, sujeitando-se a parte infratora ao pagamento de **multa equivalente a 3 (três) aluguéis** vigentes à época da infração, sem prejuízo das perdas e danos apurados.

**§ 1º.** Na hipótese de **devolução antecipada** do imóvel pelo LOCATÁRIO antes do término do prazo da Cláusula 2ª, a multa da presente cláusula será **reduzida proporcionalmente ao período já cumprido** da locação, nos termos do art. 4º da Lei nº 8.245/1991.

**§ 2º.** Fica **dispensado do pagamento da multa** o LOCATÁRIO que for **transferido, pelo seu empregador, para prestar serviços em localidade diversa** daquela do início do contrato, desde que notifique o LOCADOR por escrito com antecedência mínima de **30 (trinta) dias** (art. 4º, parágrafo único, da Lei nº 8.245/1991).

---

## CLÁUSULA 12ª — DA MORTE DO LOCATÁRIO

Em caso de morte do LOCATÁRIO, a locação **prossegue automaticamente** com o cônjuge ou companheiro sobrevivente e, sucessivamente, com os herdeiros necessários e as pessoas que viviam na dependência econômica do falecido, desde que residentes no imóvel, na forma do art. 11, I, da Lei nº 8.245/1991.

---

## CLÁUSULA 13ª — DAS DISPOSIÇÕES GERAIS

**§ 1º.** Toda comunicação entre as partes deverá ser feita **por escrito**, aos endereços e e-mails constantes do preâmbulo, admitindo-se o envio por **e-mail com confirmação de recebimento** ou aplicativo de mensagens, considerando-se recebida na data do envio.

**§ 2º.** A **tolerância** de qualquer das partes quanto ao descumprimento de obrigação constitui **mera liberalidade**, não implicando novação, renúncia de direito ou alteração das cláusulas ora pactuadas.

**§ 3º.** Este contrato obriga as partes, seus herdeiros e sucessores a qualquer título.

**§ 4º.** As partes reconhecem a validade de assinaturas eletrônicas, nos termos da legislação aplicável.

**§ 5º.** Integram este contrato, para todos os efeitos:
- **Anexo I** — Laudo de Vistoria de Entrada (com registro fotográfico);
- **Anexo II** — Cópia dos documentos das partes;
- **Anexo III** — Comprovante de depósito da caução em caderneta de poupança.

---

## CLÁUSULA 14ª — DO FORO

Fica eleito o **foro da comarca de {{foro_comarca}}**, local de situação do imóvel, para dirimir quaisquer questões oriundas deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja (art. 58, II, da Lei nº 8.245/1991).

---

E por estarem assim justas e contratadas, as partes assinam o presente instrumento em **02 (duas) vias** de igual teor e forma, na presença das testemunhas abaixo.

{{assinatura_cidade}}, {{assinatura_data}}.

<br>

|  |  |
|---|---|
| **_______________________________**<br>LOCADOR(A)<br>{{locador_nome}} — CPF {{locador_cpf}} | **_______________________________**<br>LOCATÁRIO(A)<br>{{locatario_nome}} — CPF {{locatario_cpf}} |

<br>

**TESTEMUNHAS:**

| | |
|---|---|
| **_______________________________**<br>Nome: {{testemunha1_nome}}<br>CPF: {{testemunha1_cpf}} | **_______________________________**<br>Nome: {{testemunha2_nome}}<br>CPF: {{testemunha2_cpf}} |
`;
