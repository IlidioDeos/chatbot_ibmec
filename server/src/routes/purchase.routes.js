import express from 'express';
import {
  createPurchase,
  getCustomerPurchases,
  getSalesReport,
} from '../controllers/purchase.controller.js';

const router = express.Router();

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 */
router.post('/', createPurchase);

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
 *     responses:
 *       200:
 *         description: Lista de compras do cliente
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
 *                 averageTicket:
 *                   type: number
 *                 totalPurchases:
 *                   type: number
 *                 totalRevenue:
 *                   type: number
 */
router.get('/report', getSalesReport);

export default router;