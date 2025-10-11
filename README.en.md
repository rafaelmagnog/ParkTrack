# 🚗 **ParkTrack — Parking Management System**

[![Status](https://img.shields.io/badge/status-In%20Development-orange)](README.md)
[![Language: PT-BR](https://img.shields.io/badge/Language-Portuguese-green)](README.md)
[![Language: EN](https://img.shields.io/badge/Language-English-red)](README.en.md)
[![Stack](https://img.shields.io/badge/Stack-Node.js%20|%20TypeScript%20|%20PostgreSQL-blue)](README.md)
[![Documentation](https://img.shields.io/badge/API-Swagger-lightgrey)](http://localhost:3333/api-docs)

> A complete and scalable API for intelligent parking management, built with Node.js, TypeScript, Prisma, PostgreSQL, and Zod.

---

## 🧭 **About the Project**

**ParkTrack** is a modern fullstack application designed to simplify parking management, allowing for **vehicle and customer registration, control, and real-time monitoring**.

Built with a clean, modular, and production-ready architecture, ParkTrack offers:

- Well-defined RESTful APIs  
- Interactive documentation with Swagger  
- Robust data validation via Zod  
- Reliable persistence with Prisma and PostgreSQL  

---

## ⚙️ **Main Features**

### 👥 **Clients**

- Create, update, delete, and list clients.  
- Data validation (CPF, name, and phone number).  

### 🚗 **Vehicles**

- Linked to a client.  
- Full CRUD with plate, model, and color validation.  
- Direct relationship with the client via foreign key (`clienteId`).  

### 🅿️ **Parking Lots**

- Vehicle entry and exit registration.  
- Calculation of amount due and parking duration.  
- Detailed endpoint with `include` for vehicle and client.  

---

## 🧠 **Technologies Used**

| Category             | Technologies           |
| --------------------- | ---------------------- |
| **Language**          | TypeScript             |
| **Backend Framework** | Express.js             |
| **ORM**               | Prisma                 |
| **Database**          | PostgreSQL             |
| **Validation**        | Zod                    |
| **Documentation**     | Swagger UI             |
| **Environment**       | Docker & Docker Compose|
| **Execution**         | ts-node, nodemon       |

---

## 🧩 **Project Structure**

```plaintext
📦 ParkTrack
├── src/
│   ├── controllers/        # Route controllers (entry rules)
│   ├── routes/             # Express route definitions
│   ├── services/           # Business logic layer
│   ├── schemas/            # Zod validations
│   ├── db/                 # Prisma Client connection and setup
│   ├── swagger/            # Swagger configuration
│   ├── middlewares/        # Validation and error middlewares
│   └── index.ts            # Application entry point
│
├── prisma/
│   ├── schema.prisma       # Table and relationship definitions
│   └── migrations/         # Prisma-generated migrations
│
├── .env (local - not versioned)
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
└── README.md
````

---

## 🚀 **How to Run the Project**

### 🧱 **1. Clone the Repository**

```bash
git clone https://github.com/rafaelmagnog/ParkTrack.git
cd ParkTrack
```

### ⚙️ **2. Create the `.env` File**

```env
DATABASE_URL="postgresql://YourUser:YourPassword@localhost:5432/parktrack_db?schema=public"
PORT=3333
```

### 🐳 **3. Start the Containers with Docker**

```bash
docker-compose up -d
```

### 🔧 **4. Run Migrations and Generate Prisma Client**

```bash
npx prisma generate
npx prisma migrate deploy
```

### ▶️ **5. Start the Application**

Production mode:

```bash
npm start
```

Development mode:

```bash
docker compose --profile dev up
```

---

## 📚 **API Documentation**

After starting the project, access:
👉 **Swagger UI:** [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

There you’ll find all documented endpoints, with request and response examples.

---

## 🧩 **Main Endpoints**

| Resource         | Method   | Endpoint                     | Description                       |
| ---------------- | -------- | ---------------------------- | --------------------------------- |
| **Clients**      | `GET`    | `/clientes`                  | List all clients                  |
|                  | `GET`    | `/clientes/:id`              | Get a specific client             |
|                  | `POST`   | `/clientes`                  | Create a new client               |
|                  | `PUT`    | `/clientes/:id`              | Update an existing client         |
|                  | `DELETE` | `/clientes/:id`              | Delete a client                   |
| **Vehicles**     | `GET`    | `/veiculos`                  | List all vehicles                 |
|                  | `GET`    | `/veiculos/:id`              | Get vehicle details               |
|                  | `POST`   | `/veiculos`                  | Register a new vehicle            |
|                  | `PUT`    | `/veiculos/:id`              | Update vehicle information        |
|                  | `DELETE` | `/veiculos/:id`              | Delete a vehicle                  |
| **Parking Lots** | `GET`    | `/estacionamentos`           | List all records                  |
|                  | `GET`    | `/estacionamentos/detalhado` | List with client and vehicle data |
|                  | `POST`   | `/estacionamentos`           | Register vehicle entry            |
|                  | `PUT`    | `/estacionamentos/:id`       | Update exit or amount             |
|                  | `DELETE` | `/estacionamentos/:id`       | Delete a record                   |

---

## 💬 **Request Example**

### 🔹 Create a New Vehicle

```bash
POST http://localhost:3333/veiculos \
  "Content-Type: application/json" \
  '{
    "placa": "ABC1234",
    "modelo": "Fiat Argo",
    "cor": "Silver",
    "clienteId": 1
  }'
```

**Expected Response (201 Created):**

```json
{
  "id": 5,
  "placa": "ABC1234",
  "modelo": "Fiat Argo",
  "cor": "Silver",
  "clienteId": 1
}
```

---

## 🧰 **Available Scripts**

```bash
npm run dev             # Run the server with nodemon
npm run build           # Compile TypeScript
npm start               # Run compiled version
npx prisma studio       # Open Prisma Studio (database GUI)
```

---

## 🧪 **Testing and Validation**

All requests are validated with **Zod**, ensuring data security and consistency.
Errors are standardized through a central middleware, returning well-structured and readable JSON responses.

---

## 🐳 **Docker — Useful Commands**

```bash
docker-compose up -d        # Start containers (PostgreSQL + API)
docker-compose down         # Stop containers
docker ps                   # List running containers
docker logs parktrack_app   # Show application logs
docker exec -it parktrack_postgres psql -U postgres -d parktrack_db
```

---

## 💡 **Future Improvements**

* Implement JWT authentication for access control.
* Add a pricing system based on parking duration.
* Frontend implementation.

---
