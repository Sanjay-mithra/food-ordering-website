import { axiosInstance } from "../axios/axiosinstance";

export const listAllRestaurants = async () => {
  return await axiosInstance.get("/hotel/listhotels");
};

// New service function to fetch menu by restaurant
export const getMenuByRestaurant = async (restaurantName) => {
  return await axiosInstance.get(`/hotel/menu/${restaurantName}`);
};

export const deleteRestaurant = async (id) => {
  return await axiosInstance.delete(`/hotel/deletehotel/${id}`, {
    withCredentials: true,
  });
};
