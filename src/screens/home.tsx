import { Box, Grid, Image } from "@chakra-ui/react";
import Layout from "../components/common/layout";

export default function Home() {
    return (
        <>
            <Layout />
            <Grid
                mt={10}
                px={40}
                columnGap={4}
                rowGap={8}
                templateColumns={"repeat(5, 1fr)"}
            >
                <Box>
                    <Box rounded="3xl" overflow="hidden">
                        <Image
                            h="280"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-10989371/original/46c0c87f-d9bc-443c-9b64-24d9e594b54c.jpeg?im_w=720"
                        ></Image>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}
