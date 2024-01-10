import {
    Box,
    Button,
    Grid,
    Heading,
    HStack,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import Layout from "../components/common/layout";
import Room from "../components/room";

export default function Home() {
    return (
        <>
            <Layout />
            <Grid
                mt={10}
                px={{ base: 10, lg: 40 }}
                columnGap={4}
                rowGap={8}
                templateColumns={{
                    sm: "1fr",
                    md: "1fr 1fr",
                    lg: "repeat(3,1fr)",
                    xl: "repeat(4,1fr)",
                    "2xl": "repeat(5,1fr)",
                }}
            >
                <Box>
                    <Skeleton h={280} rounded="2xl" mb={7} />
                    <SkeletonText w={"50%"} noOfLines={3}></SkeletonText>
                </Box>
                <Room />
            </Grid>
        </>
    );
}
