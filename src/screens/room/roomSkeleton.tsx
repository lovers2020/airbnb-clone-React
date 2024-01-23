import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
    return (
        <Box>
            <Skeleton h={280} rounded="2xl" mb={7} />
            <SkeletonText w={"50%"} noOfLines={3}></SkeletonText>
        </Box>
    );
}
