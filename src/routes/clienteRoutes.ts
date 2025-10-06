import { Router } from "express";
import clienteController from "../controllers/clienteController";

const router = Router();

/**
 * @openapi
 * /clientes:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Lista todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteCreate'
 *     responses:
 *       201:
 *         description: Cliente criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 */
router.get("/", clienteController.getAll);
router.post("/", clienteController.create);

/**
 * @openapi
 * /clientes/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Obtém um cliente por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Atualiza um cliente
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
 *             $ref: '#/components/schemas/ClienteCreate'
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *   delete:
 *     tags:
 *       - Clientes
 *     summary: Remove um cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cliente removido
 */
router.get("/:id", clienteController.getOne);
router.put("/:id", clienteController.update);
router.delete("/:id", clienteController.remove);

export default router;
