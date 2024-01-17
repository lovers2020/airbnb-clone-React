import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
    return (
        <>
            <Header />
            <Footer />
            <ReactQueryDevtools />
            <Outlet />
        </>
    );
}
