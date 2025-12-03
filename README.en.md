<div align="center">

# 🚗 ParkTrack

[![Status](https://img.shields.io/badge/status-In%20Development-orange)](README.en.md)
[![Language: PT-BR](https://img.shields.io/badge/Language-Portuguese-green)](README.md)
[![Language: EN](https://img.shields.io/badge/Language-English-blue)](README.en.md)

### Fullstack Parking Management System

[![Deploy Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://parktrack-gamma.vercel.app)
[![Deploy Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://parktrack-api.onrender.com)
[![API Docs](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger&logoColor=black)](https://parktrack-api.onrender.com/api-docs)

<br/>

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.15.0-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7.3.5-007FFF?style=flat-square&logo=mui&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

<br/>

**Complete system to manage customers, vehicles, and parking records**

[🌐 Live Demo](https://parktrack-gamma.vercel.app) · [📖 API Docs](https://parktrack-api.onrender.com/api-docs) · [🚀 Get Started](#-how-to-run)

</div>

---

## 📋 Table of Contents

- [🧭 About the Project](#-about-the-project)
- [⚙️ Features](#%EF%B8%8F-features)
- [🛠️ Technologies](#%EF%B8%8F-technologies)
- [🏗️ Architecture](#%EF%B8%8F-architecture)
- [🚀 How to Run](#-how-to-run)
- [🔐 Environment Variables](#-environment-variables)
- [📚 API Documentation](#-api-documentation)
- [📊 Data Model](#-data-model)
- [☁️ Deploy](#%EF%B8%8F-deploy)
- [📜 Available Scripts](#-available-scripts)
- [🗺️ Roadmap](#%EF%B8%8F-roadmap)
- [👥 Contributors](#-contributors)
- [👤 Author](#-author)

---

## 🧭 About the Project

**ParkTrack** is a modern fullstack application designed to simplify parking management.  
With a robust architecture and intuitive interface, it provides full control over customers, vehicles, and entry/exit records.

> _"From vehicle check-in to check-out, everything under control in just a few clicks."_

### ✨ Highlights

- 🎯 **Modern interface** using Material-UI with light/dark theme support  
- ⚡ **Robust RESTful API** with interactive Swagger documentation  
- 🔒 **Real-time validation** with Zod on both backend and frontend  
- 📊 **Complete history tracking** preserved even after deletions  
- 🐳 **Full containerization** with Docker for easy deployment  
- 🚀 **Production-ready deployment** on Vercel (frontend) and Render (backend)

---

## ⚙️ Features

<table>
<tr>
<td width="33%" valign="top">

### 👥 Customers

- ✅ Full CRUD (create, list, edit, delete)
- ✅ Search by name, CPF, or phone
- ✅ CPF validation (11 numeric digits)
- ✅ Phone validation (10–15 characters)
- ✅ Protection against deletion with dependencies
- ✅ Optional cascade deletion (vehicles + history)

</td>
<td width="33%" valign="top">

### 🚗 Vehicles

- ✅ Full CRUD (create, list, edit, delete)
- ✅ Search by plate, model, or customer name
- ✅ Plate validation (4–8 characters)
- ✅ Mandatory customer association
- ✅ Protection against deletion with active history
- ✅ Option to keep history when deleting

</td>
<td width="33%" valign="top">

### 🅿️ Parking

- ✅ Entry registration (automatic timestamp)
- ✅ Exit registration with date/time
- ✅ Automatic calculation (R$10/hour)
- ✅ Filter by status (all, active, completed)
- ✅ Search by vehicle plate
- ✅ Vehicle snapshot preserved in history

</td>
</tr>
</table>

### 🎨 Interface Features

- 🌓 Light/dark theme toggle with persistence  
- 📱 Responsive design (mobile-friendly)  
- ✨ Snackbar feedback  
- ⏳ Loading states for all operations  
- ⚠️ Confirmation dialogs for destructive actions  
- 🔍 Real-time search and filtering  

---

## 🛠️ Technologies

<table>
<tr>
<th align="center">🔧 Backend</th>
<th align="center">🎨 Frontend</th>
<th align="center">☁️ Infrastructure</th>
</tr>
<tr>
<td valign="top">

| Technology | Version |
| ---------- | ------- |
| Node.js    | 18+     |
| Express.js | 5.1.0   |
| TypeScript | 5.9.3   |
| Prisma ORM | 5.15.0  |
| PostgreSQL | 15      |
| Zod        | 4.1.12  |
| Swagger    | 6.2.8   |

</td>
<td valign="top">

| Technology   | Version |
| ------------ | ------- |
| React        | 19.2.0  |
| TypeScript   | 5.9.3   |
| Vite         | 7.2.4   |
| Material-UI  | 7.3.5   |
| Axios        | 1.13.2  |
| React Router | 7.9.6   |
| Zod          | 4.1.13  |

</td>
<td valign="top">

| Technology     | Use              |
| -------------- | ---------------- |
| Docker         | Containerization |
| Docker Compose | Orchestration    |
| Nginx          | Web server       |
| Vercel         | Frontend deploy  |
| Render         | Backend deploy   |

</td>
</tr>
</table>

---

## 🏗️ Architecture

The project follows a **monorepo** structure with clear separation between backend and frontend:

```
📦 ParkTrack/
│
├── 📄 docker-compose.yml        # Container orchestration
├── 📄 .env.example              # Environment variables template
├── 📄 README.md                 # Main documentation
│
├── 🔧 backend/
│   ├── 📄 Dockerfile
│   ├── 📄 package.json
│   ├── 📁 prisma/
│   │   ├── schema.prisma        # Data model
│   │   └── migrations/          # Migration history
│   └── 📁 src/
│       ├── 📄 index.ts          # Entry point
│       ├── 📁 controllers/      # Control layer (HTTP)
│       ├── 📁 services/         # Business rules
│       ├── 📁 routes/           # Route definitions
│       ├── 📁 schemas/          # Zod validations
│       ├── 📁 middlewares/      # Error handling & validation
│       ├── 📁 db/               # Prisma client
│       └── 📁 swagger/          # OpenAPI configuration
│
└── 🎨 frontend/
    ├── 📄 Dockerfile
    ├── 📄 nginx.conf
    ├── 📄 vercel.json           # Vercel configuration (SPA)
    ├── 📄 package.json
    └── 📁 src/
        ├── 📄 main.tsx          # Entry point
        ├── 📄 App.tsx           # Root component + routes
        ├── 📁 components/       # Reusable components
        │   ├── 📁 clientes/
        │   ├── 📁 veiculos/
        │   ├── 📁 estacionamentos/
        │   └── 📁 common/
        ├── 📁 pages/            # Application pages
        ├── 📁 services/         # API calls (Axios)
        ├── 📁 hooks/            # Custom hooks
        ├── 📁 types/            # TypeScript definitions
        ├── 📁 schemas/          # Client-side validations
        └── 📁 config/           # API configuration
```

---

## 🚀 How to Run

### 📋 Requirements

- **Node.js** 18+
- **npm** 10+ or **yarn**
- **Docker** & **Docker Compose**
- **Git**

---

### ⚡ Option 1: Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/rafaelmagnog/ParkTrack.git
cd ParkTrack

# 2. Configure environment variables
cp .env.example .env
# Edit .env if needed

# 3. Start all containers
docker-compose up -d

# 4. Verify services
docker-compose ps
````

**🌐 Access:**

| Service    | URL                                                              |
| ---------- | ---------------------------------------------------------------- |
| Frontend   | [http://localhost](http://localhost)                             |
| Backend    | [http://localhost:3333](http://localhost:3333)                   |
| Swagger    | [http://localhost:3333/api-docs](http://localhost:3333/api-docs) |
| PostgreSQL | localhost:5433                                                   |

---

### 🔧 Option 2: Manual Run (Development)

**Backend:**

```bash
cd backend

npm install
npx prisma generate
npx prisma migrate dev

npm run dev
```

**Frontend:**

```bash
cd frontend

npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file at the project root based on `.env.example`:

```env
# ===========================================
# Database (PostgreSQL)
# ===========================================
POSTGRES_DB=parktrack_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here

# ===========================================
# Backend
# ===========================================
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public
PORT=3333
NODE_ENV=development

# ===========================================
# Frontend
# ===========================================
VITE_API_URL=http://localhost:3333
```

---

## 📚 API Documentation

### 🔗 Swagger UI

Interactive documentation:

* **Local:** [http://localhost:3333/api-docs](http://localhost:3333/api-docs)
* **Production:** [https://parktrack-api.onrender.com/api-docs](https://parktrack-api.onrender.com/api-docs)

---

### 📍 Endpoints

#### 👥 Customers — `/clientes`

| Method   | Endpoint        | Description        |
| -------- | --------------- | ------------------ |
| `GET`    | `/clientes`     | List all customers |
| `GET`    | `/clientes/:id` | Get customer by ID |
| `POST`   | `/clientes`     | Create customer    |
| `PUT`    | `/clientes/:id` | Update customer    |
| `DELETE` | `/clientes/:id` | Delete customer    |

#### 🚗 Vehicles — `/veiculos`

| Method   | Endpoint        | Description       |
| -------- | --------------- | ----------------- |
| `GET`    | `/veiculos`     | List all vehicles |
| `GET`    | `/veiculos/:id` | Get vehicle by ID |
| `POST`   | `/veiculos`     | Create vehicle    |
| `PUT`    | `/veiculos/:id` | Update vehicle    |
| `DELETE` | `/veiculos/:id` | Delete vehicle    |

#### 🅿️ Parking — `/estacionamentos`

| Method   | Endpoint               | Description                           |
| -------- | ---------------------- | ------------------------------------- |
| `GET`    | `/estacionamentos`     | List all records                      |
| `GET`    | `/estacionamentos/:id` | Get record by ID                      |
| `POST`   | `/estacionamentos`     | Register vehicle entry                |
| `PUT`    | `/estacionamentos/:id` | Register exit & calculate final price |
| `DELETE` | `/estacionamentos/:id` | Delete record                         |

---

### 📝 Request Examples

<details>
<summary><strong>Create Customer</strong></summary>

```bash
curl -X POST http://localhost:3333/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "telefone": "11999999999"
  }'
```

</details>

<details>
<summary><strong>Create Vehicle</strong></summary>

```bash
curl -X POST http://localhost:3333/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC1D23",
    "modelo": "Fiat Argo",
    "cor": "Prata",
    "clienteId": 1
  }'
```

</details>

<details>
<summary><strong>Register Entry</strong></summary>

```bash
curl -X POST http://localhost:3333/estacionamentos \
  -H "Content-Type: application/json" \
  -d '{
    "veiculoId": 1
  }'
```

</details>

<details>
<summary><strong>Register Exit</strong></summary>

```bash
curl -X PUT http://localhost:3333/estacionamentos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "horaSaida": "2025-12-03T18:00:00Z",
    "valor": 30.00
  }'
```

</details>

---

## 📊 Data Model

```prisma
model Cliente {
  id        Int       @id @default(autoincrement())
  nome      String
  telefone  String
  cpf       String    @unique
  veiculos  Veiculo[]
}

model Veiculo {
  id              Int              @id @default(autoincrement())
  placa           String           @unique
  modelo          String
  cor             String
  clienteId       Int
  cliente         Cliente          @relation(fields: [clienteId], references: [id])
  estacionamentos Estacionamento[]
}

model Estacionamento {
  id              Int       @id @default(autoincrement())
  veiculoId       Int?
  veiculo         Veiculo?  @relation(fields: [veiculoId], references: [id])
  horaEntrada     DateTime  @default(now())
  horaSaida       DateTime?
  valor           Float?
  veiculoSnapshot Json?     // Preserves data if the vehicle is deleted
}
```

### 📌 Notes

* **Customer → Vehicle:** 1:N relationship
* **Vehicle → Parking:** 1:N relationship
* **veiculoSnapshot:** Stores vehicle data if deleted, preserving history

---

## ☁️ Deploy

### 🌐 Production URLs

| Service     | Platform | URL                                                                                        |
| ----------- | -------- | ------------------------------------------------------------------------------------------ |
| 🎨 Frontend | Vercel   | [https://parktrack-gamma.vercel.app](https://parktrack-gamma.vercel.app)                   |
| 🔧 Backend  | Render   | [https://parktrack-api.onrender.com](https://parktrack-api.onrender.com)                   |
| 📚 API Docs | Render   | [https://parktrack-api.onrender.com/api-docs](https://parktrack-api.onrender.com/api-docs) |

---

## 📜 Available Scripts

### Backend

```bash
npm run dev
npm run build
npm start
npm run prisma:generate
npm run prisma:migrate
npx prisma studio
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Docker

```bash
docker-compose up -d
docker-compose down
docker-compose logs -f
docker-compose up --build -d
docker-compose ps
```

---

## 🗺️ Roadmap

### ✅ Completed

* [x] Full CRUD (Customers, Vehicles, Parking)
* [x] Zod validation (frontend and backend)
* [x] Swagger/OpenAPI docs
* [x] React UI with Material-UI
* [x] Light/dark theme persistence
* [x] Docker & Docker Compose
* [x] Deploy (Vercel + Render)
* [x] Vehicle snapshot on delete
* [x] Automatic price calculation (R$10/hour)
* [x] Delete confirmation modals
* [x] Dependency handling on delete

### 🔜 Upcoming Features

* [ ] JWT authentication
* [ ] Dashboard with statistics
* [ ] PDF reports
* [ ] Automated tests
* [ ] CI/CD with GitHub Actions
* [ ] Real-time notifications

---

### 📝 Commit Convention

Using **Conventional Commits** with emojis:

| Type       | Emoji | Description             |
| ---------- | ----- | ----------------------- |
| `feat`     | ✨     | New feature             |
| `fix`      | 🐛    | Bug fix                 |
| `docs`     | 📚    | Documentation           |
| `style`    | 💄    | Code formatting         |
| `refactor` | ♻️    | Refactoring             |
| `test`     | 🧪    | Tests                   |
| `chore`    | 🔧    | Maintenance             |
| `perf`     | ⚡     | Performance improvement |

---

## 👥 Contributors

<a href="https://github.com/rafaelmagnog">
  <img src="https://github.com/rafaelmagnog.png" width="60" height="60" style="border-radius: 50%;" />
</a>
&nbsp;
<a href="https://github.com/HugoLinsX">
  <img src="https://github.com/HugoLinsX.png" width="60" height="60" style="border-radius: 50%;" />
</a>

---

## 👤 Author

<div align="center">

**Rafael Magno**

[![GitHub](https://img.shields.io/badge/-rafaelmagnog-181717?style=for-the-badge\&logo=github)](https://github.com/rafaelmagnog)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge\&logo=linkedin)](https://www.linkedin.com/in/rafael-magno-dev/)

</div>

---

<div align="center">

### ⭐ If this project helped you, consider giving it a star!

<br/>

Made with TS🟦 and lots of ☕ by
[Rafael Magno](https://github.com/rafaelmagnog) and [Hugo Lins](https://github.com/HugoLinsX)

</div>
