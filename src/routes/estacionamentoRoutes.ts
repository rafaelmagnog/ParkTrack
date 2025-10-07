import { Router } from "express";
import estacionamentoController from "../controllers/estacionamentoController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createEstacionamentoSchema,
  updateEstacionamentoSchema,
  idParamSchema,
} from "../schemas/estacionamentoSchema";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Estacionamentos
 *   description: Gerenciamento de estacionamentos
 */

/**
 * @swagger
 * /estacionamentos:
 *   get:
 *     tags: [Estacionamentos]
 *     summary: Lista todos os estacionamentos
 *     responses:
 *       200:
 *         description: Lista de estacionamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estacionamento'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *   post:
 *     tags: [Estacionamentos]
 *     summary: Cria um novo estacionamento (registro)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstacionamentoCreate'
 *     responses:
 *       201:
 *         description: Estacionamento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacionamento'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /estacionamentos/detalhado:
 *   get:
 *     tags: [Estacionamentos]
 *     summary: Lista estacionamentos com informações detalhadas (vagas, veículos)
 *     responses:
 *       200:
 *         description: Lista detalhada de estacionamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstacionamentoDetalhado'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /estacionamentos/{id}:
 *   get:
 *     tags: [Estacionamentos]
 *     summary: Retorna um estacionamento pelo ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Estacionamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacionamento'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *   put:
 *     tags: [Estacionamentos]
 *     summary: Atualiza um estacionamento (ex. horaSaida, valor)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstacionamentoUpdate'
 *     responses:
 *       200:
 *         description: Estacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacionamento'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *   delete:
 *     tags: [Estacionamentos]
 *     summary: Remove um estacionamento (registro)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       204:
 *         description: Estacionamento removido
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */

router.get("/", estacionamentoController.getAll);
router.get("/detalhado", estacionamentoController.getDetailed);
router.post(
  "/",
  validateBody(createEstacionamentoSchema),
  estacionamentoController.create
);
router.get(
  "/:id",
  validateParams(idParamSchema),
  estacionamentoController.getOne
);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateEstacionamentoSchema),
  estacionamentoController.update
);
router.delete(
  "/:id",
  validateParams(idParamSchema),
  estacionamentoController.remove
);

export default router;
