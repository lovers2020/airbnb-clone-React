import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack alignItems={"flex-start"}>
            <Box position={"relative"} rounded="2xl" mb={3} overflow="hidden">
                <Image
                    minH="280"
                    src="https://a0.muscache.com/im/pictures/miso/Hosting-10989371/original/46c0c87f-d9bc-443c-9b64-24d9e594b54c.jpeg?im_w=720"
                ></Image>
                <Button
                    variant={"unstyled"}
                    position={"absolute"}
                    top={"5"}
                    right={"5"}
                    color="white"
                >
                    <FaRegHeart size="20px" />
                </Button>
            </Box>
            <Box>
                <Grid gap={2} templateColumns={"6.5fr 1fr"}>
                    <Text
                        display={"block"}
                        as="b"
                        noOfLines={1}
                        fontSize={"md"}
                    >
                        스페인 발렌시아(Valencia)
                    </Text>
                    <HStack
                        _hover={{ color: "red.100" }}
                        alignItems="center"
                        spacing={1}
                    >
                        <FaStar size={12} />
                        <Text>4.78</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"sm"} color={gray}>
                    Valencia, Spain
                </Text>
                <Text fontSize={"sm"} as="b" color={gray}>
                    $72 / night
                </Text>
            </Box>
        </VStack>
    );
}
