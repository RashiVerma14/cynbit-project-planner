# Cynbit Project Planner

> **"Your Vision. Our Intelligence. A Clearer Way Forward."**  
> An interactive, AI-assisted project discovery and estimation platform engineered as a strategic improvement to [Cynbit Technologies](https://www.cynbit.in/).

Developed by **Rashi Verma** for the **Full Stack Developer Intern Technical Assessment**.

---

## 🌟 Executive Overview & Problem Statement

Potential clients visiting Cynbit's website often have ambitious concepts for software products, AI automation systems, SaaS platforms, or custom enterprise applications, but face high barriers to initial engagement:
* They do not know which technical architecture best fits their domain.
* They struggle to define required feature scopes and non-functional requirements.
* They lack clear visibility into indicative effort hours, timelines, and budget bands.
* Standard "Contact Us" forms create friction and high initial commitment.

### The Solution: Cynbit Project Planner
An interactive self-service discovery wizard that allows potential customers to configure their project requirements, explore real-time velocity calculations, receive a tailored technology stack recommendation, and generate an AI-synthesized architectural blueprint.

---

## 🚀 Key Features

* **Visual Identity Cohesion:** Seamlessly matches Cynbit's dark obsidian theme (`#07090E`), slate glass panels, and electric cyan/indigo accents.
* **Guided 7-Step Project Discovery Wizard:**
  1. **Discipline Selection:** AI Platforms, SaaS Suites, Web Apps, Mobile Apps, Automation, E-Commerce, Enterprise.
  2. **Vision & Business Problem:** Project name, target audience, problem statement, and industry.
  3. **Capability Architecture:** Multi-select feature blocks (Auth/RBAC, AI Agents, Stripe/Payments, WebSockets, Analytics, CI/CD).
  4. **Complexity & Scale Tier:** MVP (1.0x), Intermediate (1.35x), Advanced (1.75x), Enterprise (2.25x).
  5. **Tech Strategy:** Algorithmic stack recommendations vs. custom client specifications.
  6. **Budget & Velocity Alignment:** Calibrates sprint velocity against investment bands.
  7. **Contact & Lead Dossier:** Business email, company details, confidentiality consent, and instant review.
* **Deterministic Estimation Engine:** Configurable mathematical work breakdown structure (WBS) calculating effort hours, timeline in weeks, and indicative INR budget bands ($E_{base} + \sum E_{cap}) \times M_{comp}$.
* **AI Blueprint Generator (Groq Llama 3.3 70B):** Server-side LLM inference generating structured architectural summaries, core modules, phased delivery roadmaps, and risk mitigation strategies.
* **Deterministic Fallback Engine:** 100% operational resilience — if API keys are omitted or external AI rate limits trigger, a rule-based engine constructs the complete blueprint.
* **Project Results Dashboard (`/results/:id`):** Visual metrics, tech stack cards, 4-phase milestone roadmap, and client-side PDF export.
* **Protected Lead Management Dashboard (`/admin/dashboard`):** Secure administrative login with JWT tokens, live status progression (`NEW` → `UNDER_REVIEW` → `CONTACTED` → `IN_DISCUSSION` → `CONVERTED`), search, and filtering.

---

## 🛠️ Technology Stack

| Layer | Technologies Selected | Justification |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Hook Form | High-speed client-side rendering, smooth multi-step form transitions, and responsive UI. |
| **Backend** | Node.js, Express.js (ES Modules) | Lightweight, non-blocking asynchronous REST API architecture with modular routers and controllers. |
| **Database** | MongoDB Atlas / Mongoose ODM | Document persistence for hierarchical requirement schemas, dynamic capabilities, and blueprints. |
| **Authentication**| JWT (JSON Web Tokens) & bcryptjs | Stateless, secure administrative authentication with token expiration and salted password hashing. |
| **AI Synthesis** | Groq Cloud API (`llama-3.3-70b-versatile`) | Ultra-fast token inference (< 1.5s) for generating architectural specifications; paired with deterministic fallback. |

---

## 📂 Project Architecture

```
cynbit-project-planner/
├── frontend/                     # React + Vite client
│   ├── src/
│   │   ├── components/           # Reusable UI (Navbar, Footer, Progress)
│   │   ├── pages/                # Home, Planner, Results, AdminLogin, AdminDashboard
│   │   ├── services/api.js       # Axios client with JWT interceptors
│   │   ├── context/AuthContext.jsx # Admin session state
│   │   └── index.css             # Cynbit design tokens & Tailwind utilities
├── backend/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── config/               # db.js, cors.js, environment.js
│   │   ├── controllers/          # projectController, adminController, etc.
│   │   ├── models/               # ProjectInquiry, AdminUser (Mongoose)
│   │   ├── routes/               # Modular Express API endpoints
│   │   ├── services/             # estimationService, recommendationService, aiService
│   │   ├── middleware/           # authMiddleware, validationMiddleware, errorMiddleware
│   │   └── server.js             # Application entrypoint
└── TECHNICAL_REPORT.md           # In-depth architectural report
```

---

## ⚡ Quick Start & Local Execution

### Prerequisites
* **Node.js**: v18+ (tested on Node v24)
* **npm**: v9+

### 1. Clone & Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
The backend will run at `http://localhost:5000`.  
Health check endpoint: `http://localhost:5000/api/health`.

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`.

### 3. Run Backend Test Suite
```bash
cd ../backend
npm test
```
Executes native Node.js tests verifying deterministic estimation math, complexity multipliers, and fallback blueprint synthesis.

---

## 🔐 Administrative Access
* **Route:** `/admin/login`
* **Default Reviewer Credentials:**
  * **Email:** `admin@cynbit.in`
  * **Password:** `CynbitAdmin@2026`
* *(A "Quick Access" shortcut button is also integrated directly into the login page for seamless assessment evaluation).*

---

## 📄 License
Created by Rashi Verma for the Cynbit Full Stack Developer Intern Assessment.

