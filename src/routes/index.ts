import { Router } from "express";
import clienteRoutes from "./clienteRoutes";
import veiculoRoutes from "./veiculoRoutes";
import estacionamentoRoutes from "./estacionamentoRoutes";

const routes = Router();

routes.use("/clientes", clienteRoutes);
routes.use("/veiculos", veiculoRoutes);
routes.use("/estacionamentos", estacionamentoRoutes);

export default routes;
