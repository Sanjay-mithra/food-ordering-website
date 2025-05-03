import { axiosInstance } from "../axios/axiosinstance"



export const makePaymentOnStripe =async (body)=>{
    return axiosInstance.post("/payment/makepayment",body)
}