<div align="center">

# 🔐 QR Code Authentication — Security Analysis

**Análise de segurança de um sistema de autenticação por QR Code (acadêmico)**
*Security analysis of a QR Code–based authentication system (academic)*

![Type](https://img.shields.io/badge/type-security_analysis-blueviolet)
![OWASP](https://img.shields.io/badge/OWASP-Top_10_·_ASVS-000000)
![Purpose](https://img.shields.io/badge/purpose-educational-green)

[**Português**](#-português) · [**English**](#-english)

</div>

> ⚖️ **Somente para fins educacionais e éticos. Nenhuma exploração real foi executada.**
> *For educational and ethical purposes only. No real exploitation was performed.*

---

## 🇧🇷 Português

### 📌 Visão geral

Este projeto apresenta uma **análise de segurança** de um sistema de autenticação baseado em
**QR Code** usado em ambiente acadêmico. O objetivo é identificar vulnerabilidades potenciais
e sugerir práticas de implementação seguras, seguindo padrões modernos de cibersegurança.

### ⚠️ Problema identificado

O QR Code analisado aparenta conter um **identificador estático**, o que pode introduzir riscos
se não for devidamente validado:

- QR Codes estáticos podem ser copiados ou reutilizados
- Ausência de mecanismo de expiração
- Possível falta de validação no backend

### 🔥 Riscos de segurança

- Acesso não autorizado (compartilhamento de credencial)
- Ataques de *replay*
- Uso indevido de identidade
- Controle de acesso fraco

### 🧠 Cenário de ataque (teórico)

1. O usuário exibe o QR Code
2. Outra pessoa captura o código (screenshot/foto)
3. O código é reutilizado em outro dispositivo
4. O sistema concede acesso caso não haja validação

### 🛡️ Mitigações recomendadas

- **QR Codes dinâmicos** (tokens de curta duração)
- **Validação no servidor** (server-side)
- **Autenticação baseada em sessão**
- **Mecanismos anti-replay**
- **Registro (log)** das tentativas de autenticação

### 🧩 Conceitos aplicados

Falhas de autenticação · *Replay attack* · Validação de token · Controle de acesso

### 📚 Referências

- OWASP Top 10 — A07: Identification and Authentication Failures
- OWASP ASVS — Authentication Requirements

---

## 🇺🇸 English

### 📌 Overview

This project presents a **security analysis** of a **QR Code–based authentication** system used
in an academic environment. The goal is to identify potential vulnerabilities and suggest secure
implementation practices following modern cybersecurity standards.

### ⚠️ Identified issue

The analyzed QR Code appears to contain a **static identifier**, which may introduce risk if not
properly validated:

- Static QR codes can be copied or reused
- Lack of an expiration mechanism
- Possible absence of backend validation

### 🔥 Security risks

- Unauthorized access (credential sharing)
- Replay attacks
- Identity misuse
- Weak access control

### 🧠 Attack scenario (theoretical)

1. User displays the QR Code
2. Another person captures it (screenshot/photo)
3. The code is reused on another device
4. The system grants access if no validation exists

### 🛡️ Recommended mitigations

- **Dynamic QR Codes** (short-lived tokens)
- **Server-side validation**
- **Session-based authentication**
- **Anti-replay mechanisms**
- **Logging** of authentication attempts

### 🧩 Security concepts applied

Authentication flaws · Replay attack · Token validation · Access control

### 📚 References

- OWASP Top 10 — A07: Identification and Authentication Failures
- OWASP ASVS — Authentication Requirements

---

<div align="center">

**Mateus de Lima Pereira** — Cybersecurity Student · [@teuzslima](https://github.com/teuzslima)

</div>
