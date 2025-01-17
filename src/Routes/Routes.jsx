import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import CategoryDetails from "../Pages/category/CategoryDetails";
import Login from "../Pages/login/Login";
import Register from "../Pages/login/Register";
  
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
            element:<CategoryDetails></CategoryDetails>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<Register></Register>
        },
      ]
    },
  ]);