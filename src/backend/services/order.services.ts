import Order from "../models/order";

export async function getOrders() {
  return Order.find();
}

export async function createOrder(data: any) {
  return Order.create(data);
}
