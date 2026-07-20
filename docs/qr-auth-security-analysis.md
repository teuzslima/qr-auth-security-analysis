# QR Code Authentication Security Analysis

## 📌 Overview
This project presents a security analysis of a QR Code-based authentication system used in an academic environment.

The goal is to identify potential vulnerabilities and suggest secure implementation practices following modern cybersecurity standards.

---

## ⚠️ Identified Issue

The QR Code analyzed appears to contain a **static identifier**, which may introduce security risks if not properly validated.

### Potential Vulnerability:
- Static QR codes can be copied or reused
- Lack of expiration mechanism
- Possible absence of backend validation

---

## 🔥 Security Risks

- Unauthorized access (credential sharing)
- Replay attacks
- Identity misuse
- Weak access control

---

## 🧠 Attack Scenario (Theoretical)

1. User displays QR Code
2. Another person captures the code (screenshot/photo)
3. Code is reused on another device
4. System grants access if no validation exists

---

## 🛡️ Recommended Mitigations

- Implement **dynamic QR Codes** (short-lived tokens)
- Enforce **server-side validation**
- Use **session-based authentication**
- Add **anti-replay mechanisms**
- Log authentication attempts

---

## 🧩 Security Concepts Applied

- Authentication flaws
- Replay attack
- Token validation
- Access control

---

## 📚 References

- OWASP Top 10 (A2: Broken Authentication)
- OWASP ASVS (Authentication Requirements)

---

## 👨‍💻 Author

Mateus de Lima Pereira  
Cybersecurity Student  

---

## ⚖️ Disclaimer

This project is for educational and ethical purposes only.  
No real exploitation was performed.
