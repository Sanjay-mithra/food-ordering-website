import { axiosInstance } from "../axios/axiosinstance";

export const addToCart = async (foodId, quantity = 1) => {
  return await axiosInstance.post(`/cart/addtocart/${foodId}`, { quantity });
};

export const getCartItems = async () => {
  return await axiosInstance.get("/cart/getcart");
};

export const removeCartItems = async (foodId) => {
  return await axiosInstance.delete(`/cart/removefromcart/${foodId}`);
};

export const clearCartItems = async () => {
  return await axiosInstance.post(`/cart/clearcart`);
};
