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

interface IRoomProps {
    imageURL: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
}

export default function Room({
    imageURL,
    name,
    rating,
    city,
    country,
    price,
}: IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack alignItems={"flex-start"}>
            <Box position={"relative"} rounded="2xl" mb={3} overflow="hidden">
                <Image minH="280" src={imageURL}></Image>
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
            <Box w={"100%"}>
                <Grid gap={2} templateColumns={"6.5fr 1fr"}>
                    <Text
                        display={"block"}
                        as="b"
                        noOfLines={1}
                        fontSize={"md"}
                    >
                        {name}
                    </Text>
                    <HStack alignItems="center" spacing={1}>
                        <FaStar size={12} />
                        <Text>{rating}</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"sm"} color={gray}>
                    {city}, {country}
                </Text>
                <Text fontSize={"sm"} as="b" color={gray}>
                    ${price} / night
                </Text>
            </Box>
        </VStack>
    );
}
