import { Router } from "express";
import estacionamentoController from "../controllers/estacionamentoController";

const router = Router();

/**
 * @openapi
 * /estacionamentos:
 *   get:
 *     tags:
 *       - Estacionamentos
 *     summary: Lista todos os registros de estacionamento
 *     responses:
 *       200:
 *         description: Lista de registros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estacionamento'
 *   post:
 *     tags:
 *       - Estacionamentos
 *     summary: Registra entrada de veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstacionamentoCreate'
 *     responses:
 *       201:
 *         description: Registro criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacionamento'
 */
router.get("/", estacionamentoController.getAll);
router.post("/", estacionamentoController.create);

/**
 * @openapi
 * /estacionamentos/detalhado:
 *   get:
 *     tags:
 *       - Estacionamentos
 *     summary: Lista registros com dados do veículo e cliente (include)
 *     responses:
 *       200:
 *         description: Lista detalhada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   veiculo:
 *                     $ref: '#/components/schemas/Veiculo'
 *                   horaEntrada:
 *                     type: string
 *                     format: date-time
 */
router.get("/detalhado", estacionamentoController.getDetailed);

/**
 * @openapi
 * /estacionamentos/{id}:
 *   get:
 *     tags:
 *       - Estacionamentos
 *     summary: Obtém registro por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacionamento'
 *       404:
 *         description: Registro não encontrado
 *   put:
 *     tags:
 *       - Estacionamentos
 *     summary: Atualiza registro (horaSaida/valor)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstacionamentoUpdate'
 *     responses:
 *       200:
 *         description: Atualizado
 *   delete:
 *     tags:
 *       - Estacionamentos
 *     summary: Remove registro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Removido
 */
router.get("/:id", estacionamentoController.getOne);
router.put("/:id", estacionamentoController.update);
router.delete("/:id", estacionamentoController.remove);

export default router;
