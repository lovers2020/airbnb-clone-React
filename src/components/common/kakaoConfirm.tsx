import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../global/api";

export default function KakaoConfirm() {
    const { search } = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            const status = await kakaoLogin(code);
            if (status === 200) {
                toast({
                    status: "success",
                    title: "Welcome!",
                    description: "Happy to have you back!",
                    position: "bottom-right",
                });
            }
            queryClient.refetchQueries(["me"]);
            navigate("/");
        }
    };
    useEffect(() => {
        confirmLogin();
    }, []);
    return (
        <>
            <VStack mt={40} justify="center">
                <Heading>Processing log in...</Heading>
                <Text>Don't go anywhere.</Text>
                <Spinner size={"lg"}></Spinner>
            </VStack>
        </>
    );
}
