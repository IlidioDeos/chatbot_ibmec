import { Purchase } from '../models/purchase.model.js';
import { Product } from '../models/product.model.js';
import { Customer } from '../models/customer.model.js';
import { sequelize } from '../config/database.js';

export const createPurchase = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { productId, customerId, quantity = 1 } = req.body;

    // Primeiro, verificar se o produto existe
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Buscar o cliente pelo email
    const customer = await Customer.findOne({ 
      where: { email: customerId },
      transaction: t
    });

    if (!customer) {
      await t.rollback();
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Criar a compra
    const purchase = await Purchase.create({
      ProductId: productId,
      CustomerId: customer.id,
      quantity,
      totalPrice: product.price * quantity,
    }, { transaction: t });

    // Buscar a compra completa com as relações
    const fullPurchase = await Purchase.findByPk(purchase.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'description']
        }
      ],
      transaction: t
    });

    await t.commit();
    res.status(201).json(fullPurchase);
  } catch (error) {
    await t.rollback();
    console.error('Erro ao criar compra:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getCustomerPurchases = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    // Buscar o cliente pelo email
    const customer = await Customer.findOne({ 
      where: { email: customerId }
    });
    
    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Buscar as compras usando o ID do cliente
    const purchases = await Purchase.findAll({
      where: { CustomerId: customer.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'description']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(purchases);
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getSalesReport = async (req, res) => {
  try {
    // Obter vendas por produto com informações do produto
    const salesByProduct = await Purchase.findAll({
      attributes: [
        'ProductId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'total_sales'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'total_revenue'],
      ],
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'region'],
      }],
      group: ['ProductId', 'Product.id', 'Product.name', 'Product.price', 'Product.region'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
    });

    // Calcular ticket médio
    const averageTicket = await Purchase.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('totalPrice')), 'average_ticket'],
      ],
    });

    // Calcular total de vendas e receita
    const totals = await Purchase.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_purchases'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'total_revenue'],
      ],
    });

    res.json({
      salesByProduct,
      averageTicket: Number(averageTicket.getDataValue('average_ticket')),
      totalPurchases: Number(totals.getDataValue('total_purchases')),
      totalRevenue: Number(totals.getDataValue('total_revenue')),
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ message: error.message });
  }
};