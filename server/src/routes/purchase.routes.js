import express from 'express';
import {
  createPurchase,
  getCustomerPurchases,
  getSalesReport,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
} from '../controllers/purchase.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       required:
 *         - productId
 *         - customerId
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único da compra
 *         productId:
 *           type: string
 *           format: uuid
 *           description: ID do produto comprado
 *         customerId:
 *           type: string
 *           description: Email do cliente que realizou a compra
 *         quantity:
 *           type: integer
 *           description: Quantidade comprada
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: Preço total da compra
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Lista todas as compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de todas as compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - customerId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 */
router.get('/', getAllPurchases);
router.post('/', createPurchase);

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Obtém uma compra específica pelo ID
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Detalhes da compra
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       404:
 *         description: Compra não encontrada
 *   put:
 *     summary: Atualiza uma compra existente
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Compra atualizada com sucesso
 *       404:
 *         description: Compra não encontrada
 *   delete:
 *     summary: Remove uma compra
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Compra removida com sucesso
 *       404:
 *         description: Compra não encontrada
 */
router.get('/:id', getPurchaseById);
router.put('/:id', updatePurchase);
router.delete('/:id', deletePurchase);

/**
 * @swagger
 * /purchases/customer/{customerId}:
 *   get:
 *     summary: Retorna todas as compras de um cliente
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do cliente
 *     responses:
 *       200:
 *         description: Lista de compras do cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/customer/:customerId', getCustomerPurchases);

/**
 * @swagger
 * /purchases/report:
 *   get:
 *     summary: Retorna relatório de vendas para o dashboard administrativo
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Relatório de vendas gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 salesByProduct:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ProductId:
 *                         type: string
 *                       total_sales:
 *                         type: integer
 *                       total_revenue:
 *                         type: number
 *                       Product:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                           region:
 *                             type: string
 *                 averageTicket:
 *                   type: number
 *                 totalPurchases:
 *                   type: integer
 *                 totalRevenue:
 *                   type: number
 */
router.get('/report', getSalesReport);

export default router;