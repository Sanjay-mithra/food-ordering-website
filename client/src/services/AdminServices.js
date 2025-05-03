import { axiosInstance } from "../axios/axiosinstance";

export const adminLogin = async (values) => {
  return await axiosInstance.post("/admin/login", values);
};

export const adminLogout = async () => {
  return await axiosInstance.post("/admin/logout");
};

export const updateAdminProfile = async (data) => {
  return await axiosInstance.patch("/admin/updateadmin", data);
};

export const getAdminDashboardStats = async () => {
  return await axiosInstance.get("/admin/dashboard");
};

export const getCurrentAdmin = async () => {
  return await axiosInstance.get("/admin/profile");
};

export const listAllUsers = async () => {
  return await axiosInstance.get("/admin/listallusers",{withCredentials: true});
  
}

export const addRestaurant = async (restaurantData) => {
  return await axiosInstance.post('/admin/addrestaurant', restaurantData, {
    withCredentials: true,
  });
};

export const getAdminProfile = async () => {
  return await axiosInstance.get('/admin/profile', {
    withCredentials: true,
  });
};



