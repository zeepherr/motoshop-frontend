import { authApi } from "../axios";

export const createPendingOrder = async (data) => {
  const res = await authApi.post("/orders", data);
  return res.data;
};
export const checkoutOrder = async (data) => {
  const response = await authApi.post("/orders/checkout", data);
  return response.data;
};

export const completeOrder = async (orderId, data) => {
  const response = await authApi.post(`/orders/${orderId}/complete`, data);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await authApi.post(`/orders/${orderId}/cancel`);
  return response.data;
};
// 3. Get all PENDING orders
export const getPendingOrders = async () => {
  const response = await authApi.get("/orders/pending");

  return response.data;
};

// 4. Get a single order
export const getOrderById = async (orderId) => {
  const response = await authApi.get(`/orders/${orderId}`);

  return response.data;
};

// 5. Update a PENDING order
export const updatePendingOrder = async (orderId, data) => {
  const response = await authApi.patch(`/orders/${orderId}`, data);

  return response.data;
};
