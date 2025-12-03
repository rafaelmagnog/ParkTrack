<div align="center">

# 🚗 ParkTrack

[![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-orange)](README.md)
[![Idioma: PT-BR](https://img.shields.io/badge/Idioma-Português-green)](README.md)
[![Idioma: EN](https://img.shields.io/badge/Idioma-Inglês-red)](README.en.md)

### Sistema Fullstack de Gerenciamento de Estacionamentos

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

**Sistema completo para controle de clientes, veículos e registros de entrada/saída**

[🌐 Demo ao Vivo](https://parktrack-gamma.vercel.app) · [📖 API Docs](https://parktrack-api.onrender.com/api-docs) · [🚀 Começar](#-como-executar)

</div>

---

## 📋 Índice

- [🧭 Sobre o Projeto](#-sobre-o-projeto)
- [⚙️ Funcionalidades](#%EF%B8%8F-funcionalidades)
- [🛠️ Tecnologias](#%EF%B8%8F-tecnologias)
- [🏗️ Arquitetura](#%EF%B8%8F-arquitetura)
- [🚀 Como Executar](#-como-executar)
- [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [📚 Documentação da API](#-documentação-da-api)
- [📊 Modelo de Dados](#-modelo-de-dados)
- [☁️ Deploy](#%EF%B8%8F-deploy)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)
- [🗺️ Roadmap](#%EF%B8%8F-roadmap)
- [👥 Contribuidores](#-contribuidores)
- [👤 Autor](#-autor)

---

## 🧭 Sobre o Projeto

O **ParkTrack** é uma aplicação fullstack moderna desenvolvida para simplificar o gerenciamento de estacionamentos. Com uma arquitetura robusta e interface intuitiva, o sistema oferece controle completo sobre clientes, veículos e registros de entrada/saída.

> _"Da entrada à saída do veículo, tudo sob controle em poucos cliques."_

### ✨ Destaques

- 🎯 **Interface moderna** com Material-UI e suporte a tema claro/escuro
- ⚡ **API RESTful** robusta com documentação Swagger interativa
- 🔒 **Validação em tempo real** com Zod no frontend e backend
- 📊 **Histórico completo** de movimentações preservado mesmo após exclusões
- 🐳 **Containerização completa** com Docker para deploy simplificado
- 🚀 **Deploy em produção** no Vercel (frontend) e Render (backend)

---

## ⚙️ Funcionalidades

<table>
<tr>
<td width="33%" valign="top">

### 👥 Clientes

- ✅ CRUD completo (criar, listar, editar, excluir)
- ✅ Busca por nome, CPF ou telefone
- ✅ Validação de CPF (11 dígitos numéricos)
- ✅ Validação de telefone (10-15 caracteres)
- ✅ Proteção contra exclusão com dependências
- ✅ Opção de exclusão em cascata (veículos + histórico)

</td>
<td width="33%" valign="top">

### 🚗 Veículos

- ✅ CRUD completo (criar, listar, editar, excluir)
- ✅ Busca por placa, modelo ou nome do cliente
- ✅ Validação de placa (4-8 caracteres)
- ✅ Associação obrigatória com cliente
- ✅ Proteção contra exclusão com histórico ativo
- ✅ Opção de manter histórico ao excluir

</td>
<td width="33%" valign="top">

### 🅿️ Estacionamentos

- ✅ Registro de entrada (hora automática)
- ✅ Registro de saída com data/hora
- ✅ Cálculo automático (R$10/hora)
- ✅ Filtro por status (todos, ativos, finalizados)
- ✅ Busca por placa do veículo
- ✅ Snapshot do veículo preservado no histórico

</td>
</tr>
</table>

### 🎨 Recursos de Interface

- 🌓 Alternância de tema claro/escuro com persistência
- 📱 Design responsivo (mobile-friendly)
- ✨ Feedback visual com Snackbars
- ⏳ Loading states em todas as operações
- ⚠️ Modais de confirmação para ações destrutivas
- 🔍 Busca e filtros em tempo real

---

## 🛠️ Tecnologias

<table>
<tr>
<th align="center">🔧 Backend</th>
<th align="center">🎨 Frontend</th>
<th align="center">☁️ Infraestrutura</th>
</tr>
<tr>
<td valign="top">

| Tecnologia | Versão |
| ---------- | ------ |
| Node.js    | 18+    |
| Express.js | 5.1.0  |
| TypeScript | 5.9.3  |
| Prisma ORM | 5.15.0 |
| PostgreSQL | 15     |
| Zod        | 4.1.12 |
| Swagger    | 6.2.8  |

</td>
<td valign="top">

| Tecnologia   | Versão |
| ------------ | ------ |
| React        | 19.2.0 |
| TypeScript   | 5.9.3  |
| Vite         | 7.2.4  |
| Material-UI  | 7.3.5  |
| Axios        | 1.13.2 |
| React Router | 7.9.6  |
| Zod          | 4.1.13 |

</td>
<td valign="top">

| Tecnologia     | Uso             |
| -------------- | --------------- |
| Docker         | Containerização |
| Docker Compose | Orquestração    |
| Nginx          | Servidor web    |
| Vercel         | Deploy frontend |
| Render         | Deploy backend  |

</td>
</tr>
</table>

---

## 🏗️ Arquitetura

O projeto segue uma estrutura **monorepo** com separação clara entre backend e frontend:

```
📦 ParkTrack/
│
├── 📄 docker-compose.yml        # Orquestração de containers
├── 📄 .env.example              # Template de variáveis de ambiente
├── 📄 README.md                 # Documentação principal
│
├── 🔧 backend/
│   ├── 📄 Dockerfile
│   ├── 📄 package.json
│   ├── 📁 prisma/
│   │   ├── schema.prisma        # Modelo de dados
│   │   └── migrations/          # Histórico de migrações
│   └── 📁 src/
│       ├── 📄 index.ts          # Entry point
│       ├── 📁 controllers/      # Camada de controle (HTTP)
│       ├── 📁 services/         # Regras de negócio
│       ├── 📁 routes/           # Definição de rotas
│       ├── 📁 schemas/          # Validações Zod
│       ├── 📁 middlewares/      # Error handling & validation
│       ├── 📁 db/               # Prisma client
│       └── 📁 swagger/          # Configuração OpenAPI
│
└── 🎨 frontend/
    ├── 📄 Dockerfile
    ├── 📄 nginx.conf
    ├── 📄 vercel.json           # Configuração Vercel (SPA)
    ├── 📄 package.json
    └── 📁 src/
        ├── 📄 main.tsx          # Entry point
        ├── 📄 App.tsx           # Componente raiz + rotas
        ├── 📁 components/       # Componentes reutilizáveis
        │   ├── 📁 clientes/
        │   ├── 📁 veiculos/
        │   ├── 📁 estacionamentos/
        │   └── 📁 common/
        ├── 📁 pages/            # Páginas da aplicação
        ├── 📁 services/         # Chamadas à API (Axios)
        ├── 📁 hooks/            # Custom hooks
        ├── 📁 types/            # Definições TypeScript
        ├── 📁 schemas/          # Validações client-side
        └── 📁 config/           # Configuração da API
```

---

## 🚀 Como Executar

### 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** 10+ ou **yarn**
- **Docker** e **Docker Compose** (para execução containerizada)
- **Git**

---

### ⚡ Opção 1: Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/rafaelmagnog/ParkTrack.git
cd ParkTrack

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env se necessário

# 3. Suba todos os containers
docker-compose up -d

# 4. Verifique se estão rodando
docker-compose ps
```

**🌐 Acesse:**

| Serviço    | URL                            |
| ---------- | ------------------------------ |
| Frontend   | http://localhost               |
| Backend    | http://localhost:3333          |
| Swagger    | http://localhost:3333/api-docs |
| PostgreSQL | localhost:5433                 |

---

### 🔧 Opção 2: Execução Manual (Desenvolvimento)

**Backend:**

```bash
cd backend

# Instale as dependências
npm install

# Gere o Prisma Client
npx prisma generate

# Execute as migrações (requer PostgreSQL rodando)
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

**Frontend:**

```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

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

## 📚 Documentação da API

### 🔗 Swagger UI

Acesse a documentação interativa completa em:

- **Local:** http://localhost:3333/api-docs
- **Produção:** https://parktrack-api.onrender.com/api-docs

---

### 📍 Endpoints

#### 👥 Clientes — `/clientes`

| Método   | Endpoint        | Descrição               |
| -------- | --------------- | ----------------------- |
| `GET`    | `/clientes`     | Lista todos os clientes |
| `GET`    | `/clientes/:id` | Busca cliente por ID    |
| `POST`   | `/clientes`     | Cadastra novo cliente   |
| `PUT`    | `/clientes/:id` | Atualiza cliente        |
| `DELETE` | `/clientes/:id` | Remove cliente          |

#### 🚗 Veículos — `/veiculos`

| Método   | Endpoint        | Descrição               |
| -------- | --------------- | ----------------------- |
| `GET`    | `/veiculos`     | Lista todos os veículos |
| `GET`    | `/veiculos/:id` | Busca veículo por ID    |
| `POST`   | `/veiculos`     | Cadastra novo veículo   |
| `PUT`    | `/veiculos/:id` | Atualiza veículo        |
| `DELETE` | `/veiculos/:id` | Remove veículo          |

#### 🅿️ Estacionamentos — `/estacionamentos`

| Método   | Endpoint               | Descrição                         |
| -------- | ---------------------- | --------------------------------- |
| `GET`    | `/estacionamentos`     | Lista todos os registros          |
| `GET`    | `/estacionamentos/:id` | Busca registro por ID             |
| `POST`   | `/estacionamentos`     | Registra entrada de veículo       |
| `PUT`    | `/estacionamentos/:id` | Atualiza (registra saída e valor) |
| `DELETE` | `/estacionamentos/:id` | Remove registro                   |

---

### 📝 Exemplos de Requisição

<details>
<summary><strong>Cadastrar Cliente</strong></summary>

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
<summary><strong>Cadastrar Veículo</strong></summary>

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
<summary><strong>Registrar Entrada</strong></summary>

```bash
curl -X POST http://localhost:3333/estacionamentos \
  -H "Content-Type: application/json" \
  -d '{
    "veiculoId": 1
  }'
```

</details>

<details>
<summary><strong>Registrar Saída</strong></summary>

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

## 📊 Modelo de Dados

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
  veiculoSnapshot Json?     // Preserva dados se veículo for excluído
}
```

### 📌 Observações

- **Cliente → Veículo:** Relação 1:N (um cliente pode ter vários veículos)
- **Veículo → Estacionamento:** Relação 1:N (um veículo pode ter vários registros)
- **veiculoSnapshot:** Armazena dados do veículo caso ele seja excluído, preservando o histórico

---

## ☁️ Deploy

### 🌐 URLs de Produção

| Serviço     | Plataforma | URL                                         |
| ----------- | ---------- | ------------------------------------------- |
| 🎨 Frontend | Vercel     | https://parktrack-gamma.vercel.app          |
| 🔧 Backend  | Render     | https://parktrack-api.onrender.com          |
| 📚 API Docs | Render     | https://parktrack-api.onrender.com/api-docs |

---

### 📦 Deploy do Frontend (Vercel)

1. Conecte o repositório ao Vercel
2. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Adicione a variável de ambiente:
   - `VITE_API_URL` = `https://parktrack-api.onrender.com`

---

### 📦 Deploy do Backend (Render)

1. Crie um **Web Service** no Render
2. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npx prisma migrate deploy && node dist/index.js`
3. Adicione as variáveis de ambiente:
   - `DATABASE_URL` = (sua URL do PostgreSQL)
   - `PORT` = `10000`
   - `NODE_ENV` = `production`

---

## 📜 Scripts Disponíveis

### Backend

```bash
npm run dev              # Desenvolvimento com hot reload (tsx watch)
npm run build            # Build para produção (prisma generate + tsc)
npm start                # Produção (migrate deploy + node)
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações em dev
npx prisma studio        # Abre Prisma Studio (GUI do banco)
```

### Frontend

```bash
npm run dev              # Desenvolvimento com hot reload
npm run build            # Build para produção
npm run preview          # Preview do build
npm run lint             # Executa ESLint
```

### Docker

```bash
docker-compose up -d             # Inicia containers em background
docker-compose down              # Para e remove containers
docker-compose logs -f           # Visualiza logs em tempo real
docker-compose up --build -d     # Rebuild e inicia containers
docker-compose ps                # Lista status dos containers
```

---

## 🗺️ Roadmap

### ✅ Implementado

- [x] CRUD completo (Clientes, Veículos, Estacionamentos)
- [x] Validação robusta com Zod (frontend e backend)
- [x] Documentação Swagger/OpenAPI
- [x] Interface React com Material-UI
- [x] Tema claro/escuro com persistência
- [x] Docker & Docker Compose
- [x] Deploy Vercel + Render
- [x] Snapshot de veículos ao excluir
- [x] Cálculo automático de valor (R$10/hora)
- [x] Modais de confirmação para exclusões
- [x] Tratamento de dependências na exclusão

### 🔜 Próximas Features

- [ ] Autenticação JWT
- [ ] Dashboard com estatísticas
- [ ] Relatórios em PDF
- [ ] Testes automatizados
- [ ] CI/CD com GitHub Actions
- [ ] Notificações em tempo real

---

### 📝 Padrão de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) com emojis:

| Tipo       | Emoji | Descrição                |
| ---------- | ----- | ------------------------ |
| `feat`     | ✨    | Nova funcionalidade      |
| `fix`      | 🐛    | Correção de bug          |
| `docs`     | 📚    | Documentação             |
| `style`    | 💄    | Formatação de código     |
| `refactor` | ♻️    | Refatoração              |
| `test`     | 🧪    | Testes                   |
| `chore`    | 🔧    | Tarefas de manutenção    |
| `perf`     | ⚡    | Melhorias de performance |

---

## 👥 Contribuidores
<a href="https://github.com/rafaelmagnog">
  <img src="https://github.com/rafaelmagnog.png" width="60" height="60" style="border-radius: 50%;" />
</a>
&nbsp;
<a href="https://github.com/HugoLinsX">
  <img src="https://github.com/HugoLinsX.png" width="60" height="60" style="border-radius: 50%;" />
</a>

---

## 👤 Autor

<div align="center">

**Rafael Magno**

[![GitHub](https://img.shields.io/badge/-rafaelmagnog-181717?style=for-the-badge&logo=github)](https://github.com/rafaelmagnog)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rafaelmagnog)

</div>

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

<br/>

Feito com TS🟦 e muito ☕ por [Rafael Magno](https://github.com/rafaelmagnog) e [Hugo Lins](https://github.com/HugoLinsX)

</div>
