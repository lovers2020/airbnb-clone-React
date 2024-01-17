import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const kakaoParmas = {
        client_id: "036596c21d20f3f66f7ceeedb1095500",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParmas).toString();

    return (
        <Box mb={4}>
            <HStack my={"8"}>
                <Divider />
                <Text
                    textTransform={"uppercase"}
                    color="gray.500"
                    fontSize={"xs"}
                    as={"b"}
                >
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    as="a"
                    href="https://github.com/login/oauth/authorize?client_id=f6466eae624ca07866e2&scope=read:user,user:email"
                    w="100%"
                    leftIcon={<FaComment />}
                >
                    Continue with Github
                </Button>
                <Button
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                    w="100%"
                    leftIcon={<FaGithub />}
                    colorScheme={"yellow"}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
