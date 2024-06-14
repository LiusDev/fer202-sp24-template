import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages"
import ModalsProvider from "./context/ModalsContext"
import "bootstrap/dist/css/bootstrap.min.css"
import Employees from "./pages/Employees"
import AddProject from "./pages/AddProject"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/departments/:id/employees",
        element: <Employees />,
    },
    {
        path: "projects/add",
        element: <AddProject />,
    },
])
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <ModalsProvider>
            <RouterProvider router={router} />
        </ModalsProvider>
    </React.StrictMode>
)
