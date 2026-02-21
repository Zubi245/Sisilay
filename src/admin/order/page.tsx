import React, { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface Order {
  _id: string;
  user: User;
  products: Array<{
    product: {
      _id: string;
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get("/api/admin/orders/route")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow rounded p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <h4 className="text-lg font-medium mt-4 mb-2">Products</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.products.map((item, index) => (
                    <div key={index} className="border rounded p-4 flex items-center space-x-4">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">User Information</h3>
                <p><strong>Name:</strong> {order.user.name}</p>
                <p><strong>Email:</strong> {order.user.email}</p>
                <h4 className="text-lg font-medium mt-4 mb-2">Shipping Address</h4>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
                {order.user.address && (
                  <>
                    <h4 className="text-lg font-medium mt-4 mb-2">Billing Address</h4>
                    <p>{order.user.address.street}</p>
                    <p>{order.user.address.city}, {order.user.address.state} {order.user.address.zipCode}</p>
                    <p>{order.user.address.country}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default OrdersPage;
