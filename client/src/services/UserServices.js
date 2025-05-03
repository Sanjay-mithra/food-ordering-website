import { axiosInstance } from "../axios/axiosinstance"


export const userSignup= async (values)=>{
    return await axiosInstance.post("/user/signup",values)
}

export const userLogin= async (values)=>{
    return await axiosInstance.post("/user/login",values)
}

export const userLogout= async ()=>{
    return await axiosInstance.post("/user/logout")
}

export const getCurrentUser = async () => {
    return await axiosInstance.get("/user/profile")
  };
  
export const listAllUsers = async () => {
    return await axiosInstance.get("/user/profile")
  };
  