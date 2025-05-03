import { axiosInstance } from "../axios/axiosinstance"



// Get all foods (unfiltered)
export const getAllFoods = async () => {
    return await axiosInstance.get("/foods/listfoods");
  };
  

  export const getFoodsByRestaurant = async (restaurantId = '') => {
    try {
      const response = await axiosInstance.get(`/foods/restaurant/${restaurantId}`);
      return response.data;
    } catch (err) {
      console.log("Axios error:", err.response?.data || err.message);
      return { foods: [] };
    }
  };