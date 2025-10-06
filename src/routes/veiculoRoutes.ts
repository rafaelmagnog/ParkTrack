import { Router } from "express";
import veiculoController from "../controllers/veiculoController";

const router = Router();

/**
 * @openapi
 * /veiculos:
 *   get:
 *     tags:
 *       - Veiculos
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
 *   post:
 *     tags:
 *       - Veiculos
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
 */
router.get("/", veiculoController.getAll);
router.post("/", veiculoController.create);

/**
 * @openapi
 * /veiculos/{id}:
 *   get:
 *     tags:
 *       - Veiculos
 *     summary: Obtém um veículo por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 *   put:
 *     tags:
 *       - Veiculos
 *     summary: Atualiza veículo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *   delete:
 *     tags:
 *       - Veiculos
 *     summary: Remove veículo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Veículo removido
 */
router.get("/:id", veiculoController.getOne);
router.put("/:id", veiculoController.update);
router.delete("/:id", veiculoController.remove);

export default router;
