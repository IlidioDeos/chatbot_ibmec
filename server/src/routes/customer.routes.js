import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - region
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do cliente
 *         email:
 *           type: string
 *           format: email
 *           description: Email do cliente (usado para login)
 *         name:
 *           type: string
 *           description: Nome do cliente
 *         region:
 *           type: string
 *           description: Região do cliente
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - region
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.get('/', getAllCustomers);
router.post('/', createCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Obtém um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente não encontrado
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente não encontrado
 *   delete:
 *     summary: Remove um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;