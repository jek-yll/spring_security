import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./shared/ProtectedRoute";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Register from "./components/Register";
import Layout from "./shared/Layout";


const router = createBrowserRouter([
    {
        path: "/", 
        element : <Layout><Login/></Layout>
    }, 
    {
        path: "/login",
        element: <Layout><Login/></Layout>
    },
    {
        path: "register",
        element: <Layout><Register /></Layout>
    },
    {
        path: "/products",
        element: <Layout><ProtectedRoute><ProductList/></ProtectedRoute></Layout>
    },
    {
        path: "/create-product",
        element: <Layout><ProtectedRoute><ProductForm/></ProtectedRoute></Layout>
    }

])

export default router;