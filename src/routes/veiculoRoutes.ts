import { Router } from "express";
import veiculoController from "../controllers/veiculoController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createVeiculoSchema,
  updateVeiculoSchema,
  idParamSchema,
} from "../schemas/veiculoSchema";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Veiculos
 *   description: Gestão de veículos
 */

/**
 * @swagger
 * /veiculos:
 *   get:
 *     tags: [Veiculos]
 *     summary: Lista todos os veículos
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veiculo'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *   post:
 *     tags: [Veiculos]
 *     summary: Cria um veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoCreate'
 *     responses:
 *       201:
 *         description: Veículo criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/", veiculoController.getAll);
router.post("/", validateBody(createVeiculoSchema), veiculoController.create);

/**
 * @swagger
 * /veiculos/{id}:
 *   get:
 *     tags: [Veiculos]
 *     summary: Obtém um veículo por id
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *   put:
 *     tags: [Veiculos]
 *     summary: Atualiza veículo
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoCreate'
 *     responses:
 *       200:
 *         description: Veículo atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *   delete:
 *     tags: [Veiculos]
 *     summary: Remove veículo
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Veículo removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/:id", validateParams(idParamSchema), veiculoController.getOne);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateVeiculoSchema),
  veiculoController.update
);
router.delete("/:id", validateParams(idParamSchema), veiculoController.remove);

export default router;
