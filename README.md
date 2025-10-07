# 🚗 **ParkTrack — Sistema de Gerenciamento de Estacionamentos**

[![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-orange)](README.md)
[![Idioma: PT-BR](https://img.shields.io/badge/Linguagem-Português-green)](README.md)
[![Linguagem](https://img.shields.io/badge/Stack-Node.js%20|%20TypeScript%20|%20PostgreSQL-blue)](README.md)
[![Documentação](https://img.shields.io/badge/API-Swagger-lightgrey)](http://localhost:3333/api-docs)

> Uma API completa e escalável para gestão inteligente de estacionamentos, construída com Node.js, TypeScript, Prisma, PostgreSQL e Zod.

---

## 🧭 **Sobre o Projeto**

O **ParkTrack** é uma aplicação fullstack moderna que simplifica o gerenciamento de estacionamentos, possibilitando o **cadastro, controle e monitoramento** de veículos e clientes em tempo real.

Projetado com uma arquitetura limpa, modular e pronta para produção, o ParkTrack oferece:

- APIs RESTful bem definidas;
- Documentação interativa com Swagger;
- Validação robusta de dados via Zod;
- Persistência confiável com Prisma e PostgreSQL.

---

## ⚙️ **Principais Recursos**

### 👥 **Clientes**

- Cadastro, atualização, exclusão e listagem.
- Validação de dados (CPF, nome e telefone).

### 🚗 **Veículos**

- Associados a um cliente.
- CRUD completo com validações de placa, modelo e cor.
- Relação direta com o cliente via chave estrangeira (`clienteId`).

### 🅿️ **Estacionamentos**

- Registro de entrada e saída de veículos.
- Cálculo de valor e tempo de permanência.
- Endpoint detalhado com `include` de veículo e cliente.

---

## 🧠 **Tecnologias Utilizadas**

| Categoria             | Tecnologias             |
| --------------------- | ----------------------- |
| **Linguagem**         | TypeScript              |
| **Framework Backend** | Express.js              |
| **ORM**               | Prisma                  |
| **Banco de Dados**    | PostgreSQL              |
| **Validação**         | Zod                     |
| **Documentação**      | Swagger UI              |
| **Ambiente**          | Docker & Docker Compose |
| **Execução**          | ts-node, nodemon        |

---

## 🧩 **Estrutura do Projeto**

```plaintext
📦 ParkTrack
├── src/
│   ├── controllers/        # Controladores das rotas (regras de entrada)
│   ├── routes/             # Definições das rotas Express
│   ├── services/           # Camada de lógica de negócios
│   ├── schemas/            # Validações com Zod
│   ├── db/                 # Conexão e inicialização do Prisma Client
│   ├── swagger/            # Configuração do Swagger
│   ├── middlewares/        # Middlewares de validação e erros
│   └── index.ts            # Ponto de entrada da aplicação
│
├── prisma/
│   ├── schema.prisma       # Definição das tabelas e relações
│   └── migrations/         # Migrações geradas pelo Prisma
│
├── .env (local - não versionado)
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 **Como Executar o Projeto**

### 🧱 **1. Clone o repositório**

```bash
git clone https://github.com/rafaelmagnog/ParkTrack.git
cd ParkTrack
```

### ⚙️ **2. Crie o arquivo `.env`**

```env
DATABASE_URL="postgresql://SeuUser:SuaSenha@localhost:5432/parktrack_db?schema=public"
PORT=3333
```

### 🐳 **3. Suba os containers com Docker**

```bash
docker-compose up -d
```

### 🔧 **4. Execute migrações e gere o Prisma Client**

```bash
npx prisma generate
npx prisma migrate deploy
```

### ▶️ **5. Inicie a aplicação**

Modo produção:

```bash
npm start
```

Modo desenvolvimento:

```bash
docker compose --profile dev up
```

---

## 📚 **Documentação da API**

Após rodar o projeto, acesse:
👉 **Swagger UI:** [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

Lá você encontrará todos os endpoints documentados, com exemplos de requisições e respostas.

---

## 🧩 **Endpoints Principais**

| Resource            | Método   | Endpoint                     | Descrição                            |
| ------------------- | -------- | ---------------------------- | ------------------------------------ |
| **Clientes**        | `GET`    | `/clientes`                  | Lista todos os clientes              |
|                     | `GET`    | `/clientes/:id`              | Obtém um cliente específico          |
|                     | `POST`   | `/clientes`                  | Cadastra um novo cliente             |
|                     | `PUT`    | `/clientes/:id`              | Atualiza um cliente existente        |
|                     | `DELETE` | `/clientes/:id`              | Remove um cliente                    |
| **Veículos**        | `GET`    | `/veiculos`                  | Lista todos os veículos              |
|                     | `GET`    | `/veiculos/:id`              | Detalha um veículo                   |
|                     | `POST`   | `/veiculos`                  | Cadastra um novo veículo             |
|                     | `PUT`    | `/veiculos/:id`              | Atualiza informações                 |
|                     | `DELETE` | `/veiculos/:id`              | Exclui um veículo                    |
| **Estacionamentos** | `GET`    | `/estacionamentos`           | Lista registros                      |
|                     | `GET`    | `/estacionamentos/detalhado` | Lista com dados de cliente e veículo |
|                     | `POST`   | `/estacionamentos`           | Registra entrada                     |
|                     | `PUT`    | `/estacionamentos/:id`       | Atualiza saída ou valor              |
|                     | `DELETE` | `/estacionamentos/:id`       | Remove registro                      |

---

## 💬 **Exemplo de Requisição**

### 🔹 Criar um novo veículo

```bash
curl -X POST http://localhost:3333/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC1234",
    "modelo": "Fiat Argo",
    "cor": "Prata",
    "clienteId": 1
  }'
```

**Resposta esperada (201 Created):**

```json
{
  "id": 5,
  "placa": "ABC1234",
  "modelo": "Fiat Argo",
  "cor": "Prata",
  "clienteId": 1
}
```

---

## 🧰 **Scripts Disponíveis**

```bash
npm run dev             # Executa o servidor com nodemon
npm run build           # Compila TypeScript
npm start               # Roda versão compilada
npx prisma studio       # Abre o Prisma Studio (GUI do banco)
```

---

## 🧪 **Testes e Validações**

Todas as requisições são validadas com **Zod**, garantindo segurança e consistência dos dados.
Erros são padronizados via middleware central, retornando respostas JSON estruturadas e legíveis.

---

## 🐳 **Docker — Comandos Úteis**

```bash
docker-compose up -d        # Inicia containers (PostgreSQL + API)
docker-compose down         # Encerra containers
docker ps                   # Lista containers em execução
docker logs parktrack_app   # Exibe logs da aplicação
docker exec -it parktrack_postgres psql -U postgres -d parktrack_db
```

---

## 💡 **Melhorias Futuras**

- Implementar autenticação JWT para controle de acesso.
- Adicionar sistema de tarifas com base no tempo de permanência.
- Implementação do front-end.

---
