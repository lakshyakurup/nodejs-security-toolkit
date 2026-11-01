# Node.js Security Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Security-Hardened_API-red?style=for-the-badge" alt="Security" />
</p>

A secure Node.js Express backend boilerplate implementing defense-in-depth security controls including strict HTTP security headers, rate limiting, Joi input schema validation, password hashing via Bcrypt, and production-safe error logging.

> **Internship Context:** Developed as part of the **Thiranex Cybersecurity Virtual Internship Program**.

---

## 📌 Features

- **HTTP Security Headers:** Integrated `helmet` middleware for CSP, HSTS, X-Content-Type-Options, and X-XSS-Protection headers.
- **DDoS & Brute-Force Rate Limiting:** Enforces request quotas per IP using `express-rate-limit`.
- **Schema Input Validation:** Validates incoming payloads using `joi` to prevent malicious or malformed request parameters.
- **Cryptographic Password Hashing:** Uses `bcrypt` with adaptive salt rounds to store user credentials securely.
- **Secure Secret Management:** Uses `dotenv` for environment variable loading.
- **Production Error Masking:** Implements centralized error middleware to prevent stack trace leaks.

---

## ⚙️ Architecture & Defense Controls

```
[ Incoming Request ]
          │
          ▼
   [ 1. Helmet Security Headers ]
          │
          ▼
   [ 2. Rate Limiting Middleware ]
          │
          ▼
   [ 3. Joi Input Validation ]
          │
          ▼
   [ 4. Bcrypt Hashing Layer ]
          │
          ▼
   [ 5. Centralized Error Handler ]
```

---

## 🛠️ Setup & Installation

### 1. Prerequisites
- **Node.js (v16+)** & **npm**

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
```

---

## 🚀 Usage

Start the secure server:
```bash
npm start
```

---

## 📁 Repository Structure

```text
nodejs-security-toolkit/
│
├── server.js          # Core Express application with security middleware
├── README.md          # Comprehensive security documentation
└── package.json       # Node package configuration & dependencies
```

---

## 📜 Disclaimer
*This repository serves as an educational boilerplate demonstrating Node.js web application security best practices.*

Developed for the **Thiranex Cybersecurity Virtual Internship Program**.
