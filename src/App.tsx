import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GithubConfirm from "./components/login/githubConfirm";
import KakaoConfirm from "./components/login/kakaoConfirm";
import Layout from "./components/common/layout";
import RoomDetail from "./screens/room/roomDetail";
import UploadRoom from "./screens/room/uploadRoom";
import NotFound from "./global/notfound";
import Home from "./screens/home";
import UploadPhotos from "./screens/room/uploadPhotos";
import { Helmet } from "react-helmet";
import EditRoom from "./screens/room/editRoom";

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
                path: "rooms/upload",
                element: <UploadRoom />,
            },
            {
                path: "rooms/:roomPk",
                element: <RoomDetail />,
            },
            {
                path: "rooms/:roomPk/edit",
                element: <EditRoom />,
            },
            {
                path: "rooms/:roomPk/Photos",
                element: <UploadPhotos />,
            },
            {
                path: "social",
                children: [
                    {
                        path: "github",
                        element: <GithubConfirm />,
                    },
                    {
                        path: "kakao",
                        element: <KakaoConfirm />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <>
            <Helmet>
                <title>Airbnb</title>
            </Helmet>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
