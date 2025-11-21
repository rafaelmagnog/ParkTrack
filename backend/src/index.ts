import express from "express";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
setupSwagger(app);
app.use("", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`ParkTrack API rodando em http://localhost:${PORT}`);
});
