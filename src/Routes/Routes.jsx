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
import Payment from "../Pages/Payment/Payment";
import Invoice from "../Pages/Invoice/Invoice";
import AdminDashboard from "../AdminLayout/AdminPage/AdminDashboard";
import ManageUsers from "../AdminLayout/AdminPage/manageUser/ManageUsers";
import ManageCategory from "../AdminLayout/AdminPage/manageCategory/ManageCategory";
import AdminRoute from "../AdminLayout/adminRoute/AdminRoute";
import SalesReport from "../AdminLayout/AdminPage/salesReport/SalesReport";
  
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
        {
            path:'/checkout',
            element:<PrivateRoute><Payment></Payment></PrivateRoute>
        },
        {
          path:"/invoice/:transactionId",
          element:<Invoice></Invoice>
      },
      ]
    },
    {
      path: '/admin',
      element: <AdminDashboard></AdminDashboard>,
      children: [
        {
          path: 'users',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'categories',
          element: <AdminRoute><ManageCategory></ManageCategory></AdminRoute>
        },
        {
          path: 'salesReport',
          element: <AdminRoute><SalesReport></SalesReport></AdminRoute>
        },
      ]
    }
  ]);