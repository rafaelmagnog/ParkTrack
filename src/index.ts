import express from "express";
import "dotenv/config";
import routes from "./routes/index";
import { setupSwagger } from "./swagger/swagger";

const app = express();

app.use(express.json());

// Inicializa Swagger
setupSwagger(app);

// Define rotas
app.use("", routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`ParkTrack API rodando na porta ${PORT}`);
});
