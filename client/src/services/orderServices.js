import { axiosInstance } from "../axios/axiosinstance"

export const placeOrder = async (address) => {
    return await axiosInstance.post("/order/addorder", { address });
  };


export const myOrders =async ()=>{
    return await axiosInstance.get("/order/myorders")
}