import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import CategoryDetails from "../Pages/category/CategoryDetails";
import Login from "../Pages/login/Login";
import Register from "../Pages/login/Register";
import PrivateRoute from "../Pages/Private/PrivateRoute";
import Shop from "../Pages/shop/Shop";
import Cart from "../Pages/cart/Cart";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/category/:categoryName',
            element:<PrivateRoute><CategoryDetails></CategoryDetails></PrivateRoute>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<Register></Register>
        },
        {
            path:'/shop',
            element:<Shop></Shop>
        },
        {
            path:'/cart',
            element:<Cart></Cart>
        },
      ]
    },
  ]);