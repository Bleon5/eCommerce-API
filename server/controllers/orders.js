import ErrorResponses from '../utils/ErrorResponse.js';
import { Order, OrderProduct, User, Product } from "../models/index.js";
import { createOrderSchema, updateOrderSchema } from "../schemas/orderSchemas.js";

// Yardımcı: Sipariş toplamını hesapla
const calculateTotal = async (products) => {
  let total = 0;
  for (const item of products) {
    const product = await Product.findByPk(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Product, as: 'products', through: { attributes: ['quantity'] } }
      ]
    });
    res.json(orders);
  } catch (error) {
    next(new ErrorResponses(error.message, 500));
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Product, as: 'products', through: { attributes: ['quantity'] } }
      ]
    });
    if (!order) return next(new ErrorResponses('Order not found', 404));
    res.json(order);
  } catch (error) {
    next(new ErrorResponses(error.message, 500));
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) return next(new ErrorResponses(error.details[0].message, 400));

    const { userId, products } = value;
    const user = await User.findByPk(userId);
    if (!user) return next(new ErrorResponses('User does not exist', 400));

    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return next(new ErrorResponses(`Product with id ${item.productId} does not exist`, 400));
      }
    }

    const total = await calculateTotal(products);
    const order = await Order.create({ userId, total });
    for (const item of products) {
      await OrderProduct.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      });
    }

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Product, as: 'products', through: { attributes: ['quantity'] } }
      ]
    });
    res.status(201).json(createdOrder);
  } catch (error) {
    next(new ErrorResponses(error.message, 500));
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { error, value } = updateOrderSchema.validate(req.body);
    if (error) return next(new ErrorResponses(error.details[0].message, 400));

    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new ErrorResponses('Order not found', 404));

    if (value.userId) {
      const user = await User.findByPk(value.userId);
      if (!user) return next(new ErrorResponses('User does not exist', 400));
      order.userId = value.userId;
    }

    if (value.products && Array.isArray(value.products)) {
      await OrderProduct.destroy({ where: { orderId: order.id } });
      for (const item of value.products) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          return next(new ErrorResponses(`Product with id ${item.productId} does not exist`, 400));
        }
        await OrderProduct.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity
        });
      }
      order.total = await calculateTotal(value.products);
    }

    await order.save();
    const updatedOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Product, as: 'products', through: { attributes: ['quantity'] } }
      ]
    });
    res.json(updatedOrder);
  } catch (error) {
    next(new ErrorResponses(error.message, 500));
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new ErrorResponses('Order not found', 404));
    await OrderProduct.destroy({ where: { orderId: order.id } });
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(new ErrorResponses(error.message, 500));
  }
};
