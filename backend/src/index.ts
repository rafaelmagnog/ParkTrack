/**
 * Ponto de entrada da API ParkTrack
 *
 * Aqui inicializamos o servidor Express e configuramos todos os middlewares
 * e rotas necessárias para o funcionamento da aplicação.
 */

import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Configuração de CORS para aceitar requisições do frontend
// Em produção, o FRONTEND_URL deve ser definido no ambiente (ex: Vercel)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares globais
app.use(cors(corsOptions));
app.use(express.json());

// Configuração do Swagger para documentação da API
setupSwagger(app);

// Registra todas as rotas da aplicação
app.use("", routes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Inicia o servidor na porta configurada
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`ParkTrack API rodando em http://localhost:${PORT}`);
});
