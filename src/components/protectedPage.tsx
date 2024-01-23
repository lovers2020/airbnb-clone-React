import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

export default function ProtectedPage() {
    const { isLoggedIn, userLoading } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userLoading) {
            if (!isLoggedIn) {
                navigate("/");
            }
        }
    }, [userLoading, isLoggedIn, navigate]);
    return;
}
