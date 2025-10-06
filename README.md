# 🚗 ParkTrack

[![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-orange)](README.md)
[![Idioma: PT-BR](https://img.shields.io/badge/Linguagem-Português-green)](README.md)

**Gerencie, monitore e otimize o uso de estacionamentos com eficiência e tecnologia.**

---

## 🧭 **Descrição do Projeto**

O **ParkTrack** é uma aplicação moderna desenvolvida para facilitar o **gerenciamento de estacionamentos** — seja em instituições, empresas ou locais públicos.  
Através de um painel inteligente e APIs bem estruturadas, o sistema permite o **cadastro, controle e monitoramento** de veículos, vagas e usuários em tempo real.

O objetivo é proporcionar **organização, segurança e praticidade** para administradores e motoristas.

---

## ⚙️ **Principais Funcionalidades**

### 🚙 **Para Usuários (Motoristas)**
- Cadastro e autenticação segura
- Visualização de vagas disponíveis
- Solicitação de entrada e saída
- Histórico de estacionamentos

### 🧑‍💼 **Para Administradores**
- Painel de controle com estatísticas em tempo real
- CRUD completo de usuários, veículos e vagas
- Monitoramento de ocupação do estacionamento
- Geração de relatórios e alertas automáticos

### 🧠 **Extras**
- Documentação completa da API via **Swagger**
- Validação de dados com **Zod**
- Banco de dados relacional robusto com **PostgreSQL**
- Estrutura escalável e modular com **Prisma ORM**

---

## 🛠️ **Tecnologias Utilizadas**

- **Node.js** + **TypeScript**
- **Express.js** — Framework backend
- **Prisma ORM** — Mapeamento de dados
- **PostgreSQL** — Banco de dados relacional
- **Zod** — Validação de esquemas
- **Swagger UI** — Documentação interativa
- **Docker** — Containerização de ambiente
- **Git** — Controle de versão

---

## 🚀 **Como Rodar a Aplicação**

### 📋 **Pré-requisitos**
Antes de começar, instale:

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/rafaelmagnog/ParkTrack.git
cd ParkTrack
````

---

### 2️⃣ **Instale as Dependências**

```bash
npm install
```

---

### 3️⃣ **Configure o Banco de Dados**

#### 🔹 Inicie o container PostgreSQL com Docker:

```bash
docker-compose up -d
```

O container será criado com as seguintes configurações padrão:

| Configuração | Valor        |
| ------------ | ------------ |
| **Host**     | localhost    |
| **Porta**    | 5433         |
| **Usuário**  | admin        |
| **Senha**    | admin        |
| **Banco**    | parktrack_db |

---

### 4️⃣ **Configure o arquivo `.env`**

Crie o arquivo `.env` na raiz do projeto e adicione:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/parktrack_db"
PORT=3333
```

---

### 5️⃣ **Execute as Migrações e Gere o Prisma Client**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### 6️⃣ **Inicie o Servidor**

```bash
npm run dev
```

A API estará disponível em:
👉 **[http://localhost:3333](http://localhost:3333)**

E a documentação Swagger em:
👉 **[http://localhost:3333/api-docs](http://localhost:3333/api-docs)**

---

## 📚 **Endpoints Principais**

### 🚗 **Veículos**

* `POST /veiculos` — Cadastrar veículo
* `GET /veiculos` — Listar veículos
* `PUT /veiculos/:id` — Atualizar dados
* `DELETE /veiculos/:id` — Remover veículo

### 🅿️ **Vagas**

* `POST /vagas` — Criar vaga
* `GET /vagas` — Listar vagas disponíveis
* `PUT /vagas/:id` — Atualizar status (ocupada/livre)
* `DELETE /vagas/:id` — Deletar vaga

### 👥 **Usuários**

* `POST /usuarios` — Registrar novo usuário
* `GET /usuarios` — Listar todos os usuários
* `PUT /usuarios/:id` — Atualizar dados
* `DELETE /usuarios/:id` — Excluir conta

---

## 🧩 **Estrutura do Projeto**

```plaintext
📁 ParkTrack
├── src
│   ├── controllers/        # Camada de entrada (HTTP)
│   ├── routes/             # Definição das rotas
│   ├── services/           # Regras de negócio (ex: veiculoService.ts)
│   ├── schemas/            # Schemas Zod (validações)
│   ├── db/                 # Inicialização do Prisma Client
│   ├── swagger/            # Configurações gerais do Swagger
│   └── index.ts            # Main
│
├── prisma
│   ├── schema.prisma       # Modelo de dados
│   └── migrations/         # Histórico de migrações
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
├── README.md
└── .env (local - não versionado)
```

## 🧠 **Validações (Zod)**

O ParkTrack implementa validações robustas para garantir consistência dos dados:

* **Placa**: formato válido (`AAA-1234` ou `AAA1B23`)
* **E-mail**: formato obrigatório e único
* **Telefone**: 10 a 15 caracteres
* **Campos obrigatórios**: nome, vaga, status e horário de entrada

---

## 🐳 **Docker Commands Úteis**

```bash
docker-compose up -d        # Inicia o container do PostgreSQL
docker-compose down         # Encerra e remove containers
docker ps                   # Lista containers em execução
docker logs parktrack-db    # Mostra logs do banco
```

---

## 🧪 **Testando a API**

Você pode testar diretamente pelo **Swagger UI** ou com ferramentas como **Insomnia** ou **Postman**.

Exemplo de requisição para criar um veículo:

```bash
curl -X POST http://localhost:3333/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC-1234",
    "modelo": "Fiat Argo",
    "cor": "Prata",
    "usuarioId": 1
  }'
```

---

## 🧰 **Scripts Disponíveis**

```bash
npm run dev             # Executa o servidor em modo desenvolvimento
npm run build           # Compila para produção
npm start               # Inicia a versão compilada
npm run prisma:studio   # Abre o Prisma Studio
```

---

## 💡 **Melhorias Futuras**

* Sistema de **notificações em tempo real**
* **Controle de acesso por níveis** (admin, segurança, motorista)
* Relatórios automáticos de uso e tempo médio de ocupação

---
