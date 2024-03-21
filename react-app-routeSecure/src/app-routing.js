import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./shared/ProtectedRoute";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Register from "./components/Register";
import Header from "./shared/Header";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/products",
                element: <ProtectedRoute><ProductList/></ProtectedRoute>
            },
            {
                path: "/create-product",
                element: <ProtectedRoute><ProductForm/></ProtectedRoute>
            }
        ]
    }

])

export default router;