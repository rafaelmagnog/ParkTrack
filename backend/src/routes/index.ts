/**
 * Arquivo central de rotas da API
 *
 * Aqui juntamos todas as rotas da aplicação.
 * Cada recurso (clientes, veículos, estacionamentos) tem seu próprio arquivo de rotas.
 */

import { Router } from "express";
import clienteRoutes from "./clienteRoutes";
import veiculoRoutes from "./veiculoRoutes";
import estacionamentoRoutes from "./estacionamentoRoutes";

const routes = Router();

// Registra as rotas de cada recurso com seu prefixo
routes.use("/clientes", clienteRoutes);
routes.use("/veiculos", veiculoRoutes);
routes.use("/estacionamentos", estacionamentoRoutes);

export default routes;
