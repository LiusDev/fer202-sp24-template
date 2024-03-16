import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages"
import ModalsProvider from "./context/ModalsContext"
import "bootstrap/dist/css/bootstrap.min.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
