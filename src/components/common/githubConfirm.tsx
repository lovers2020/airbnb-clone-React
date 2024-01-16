import { Center, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { githubLogIn } from "../../global/api";

export default function GithubConfirm() {
    const { search } = useLocation();
    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            await githubLogIn(code);
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
