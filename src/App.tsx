import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GithubConfirm from "./components/common/githubConfirm";
import Layout from "./components/common/layout";
import RoomDetail from "./components/room/roomDetail";
import NotFound from "./global/notfound";
import Home from "./screens/home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "rooms/:roomPk",
                element: <RoomDetail />,
            },
            {
                path: "social",
                children: [
                    {
                        path: "github",
                        element: <GithubConfirm />,
                    },
                ],
            },
        ],
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
