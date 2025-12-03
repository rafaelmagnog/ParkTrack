import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Configuração de CORS para aceitar requisições do frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
setupSwagger(app);
app.use("", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`ParkTrack API rodando em http://localhost:${PORT}`);
});
