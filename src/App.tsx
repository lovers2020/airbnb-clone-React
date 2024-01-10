import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/notfound";
import Home from "./screens/home";

const router = createBrowserRouter([
    {
        path: "",
        element: <Home />,
        errorElement: <NotFound />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
