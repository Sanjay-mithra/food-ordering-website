import {
  createBrowserRouter
} from "react-router-dom";

import Login from "../pages/shared/Login";
import Homepage from "../pages/Homepage";
import Userlayout from "../lauouts/userLayout";
import FoodDetails from "../pages/FoodDetails";
import Cartpage from "../pages/Cartpage";
import Orderpage from "../pages/Orderpage";
import Signup from "../pages/Signup";
import NotFound from "../pages/notFound";
import PaymentSuccess from "../pages/paymentSuccess";
import PaymentFailed from "../pages/paymentFailed";
import CheckoutPage from "../pages/checkOutPage";
import AdminLayout from "../lauouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRestaurants from "../pages/AdminRestaurants";
import AdminFood from "../pages/AdminFoods";
import AdminUsers from "../pages/AdminUsers";
import AdminAddRestaurant from "../pages/AdminAddRestaurant";
import AdminProfile from "../pages/AdminProfile";
import RestaurantFoods from "../pages/RestaurantFoods";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/cartpage", element: <Cartpage /> },
      { path: "/payment/success", element: <PaymentSuccess /> },
      { path: "/payment/failed", element: <PaymentFailed /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/myorders", element: <Orderpage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/fooddetails", element: <FoodDetails /> },
      {path:"/restaurant/:id", element:<RestaurantFoods/> }
    ],
  },
  
  {
    path: "/admin/login",
    element: <Login/>
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <AdminDashboard/> },
      { path: "allrestaurants", element: <AdminRestaurants/> },
      { path: "foods", element: <AdminFood/> },
      { path: "listallusers", element: <AdminUsers/> },
      { path: "addrestaurant", element: <AdminAddRestaurant/> },
      { path: "profile", element: <AdminProfile/> },


    ],
  },

]);

export default routes;
