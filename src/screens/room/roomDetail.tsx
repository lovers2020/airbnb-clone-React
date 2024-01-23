import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { checkBooking, getRoomDetail, getRoomReviews } from "../../global/api";
import { IReview, IRoomDetail } from "../../global/types";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

export default function RoomDetail() {
    const [dates, setDates] = useState<Date[]>();
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["rooms", roomPk],
        getRoomDetail
    );

    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
        IReview[]
    >(["rooms", roomPk, "reviews"], getRoomReviews);
    const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
        ["check", roomPk, dates],
        checkBooking,
        {
            cacheTime: 0,
            enabled: dates !== undefined,
        }
    );

    return (
        <>
            <Box pb={10} mt={10} px={{ base: 10, lg: 40 }}>
                <Skeleton h={"43px"} isLoaded={!isLoading}>
                    <Heading>{data?.name}</Heading>
                </Skeleton>
                <Grid
                    mt={8}
                    rounded="xl"
                    overflow={"hidden"}
                    h={"60vh"}
                    templateRows={"1fr 1fr"}
                    templateColumns={"repeat(4,1fr)"}
                    gap={2}
                >
                    {[0, 1, 2, 3, 4].map((index) => (
                        <GridItem
                            colSpan={index === 0 ? 2 : 1}
                            rowSpan={index === 0 ? 2 : 1}
                            overflow={"hidden"}
                            key={index}
                        >
                            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                                {data?.photos && data?.photos.length !== 0 ? (
                                    <Image
                                        width="100%"
                                        h="100%"
                                        objectFit="cover"
                                        src={data?.photos[index]?.file}
                                    />
                                ) : null}
                            </Skeleton>
                        </GridItem>
                    ))}
                </Grid>
                <Grid gap={60} templateColumns={"2fr 1fr"}>
                    <Box>
                        <HStack mt={"10"} justify="space-between">
                            <VStack alignItems={"flex-start"}>
                                <Skeleton isLoaded={!isLoading} h="30px">
                                    <Heading fontSize="2xl">
                                        House hosted by {data?.owner.name}
                                    </Heading>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} h="30px">
                                    <HStack justify={"flex-start"} w="100%">
                                        <Text>
                                            {data?.toilets} toilet
                                            {data?.toilets === 1 ? "" : "s"}
                                        </Text>
                                        <Text>·</Text>
                                        <Text>
                                            {data?.rooms} room
                                            {data?.rooms === 1 ? "" : "s"}
                                        </Text>
                                    </HStack>
                                </Skeleton>
                            </VStack>
                            <Avatar
                                name={data?.owner.name}
                                size={"xl"}
                                src={data?.owner.avatar}
                            ></Avatar>
                        </HStack>
                        <Box mt={10}>
                            <Heading fontSize={"2xl"} mb={5}>
                                <Skeleton isLoaded={!isReviewsLoading}>
                                    <HStack>
                                        <FaStar />
                                        <Text>{data?.rating}</Text>
                                        <Text>·</Text>
                                        <Text>
                                            {reviewsData?.length} review
                                            {reviewsData?.length === 1
                                                ? ""
                                                : "s"}
                                        </Text>
                                    </HStack>
                                </Skeleton>
                            </Heading>
                            <Container
                                mt={16}
                                marginX={"none"}
                                maxW="container.lg"
                            >
                                <Grid templateColumns={"1fr 1fr"} gap={10}>
                                    {reviewsData?.map((review, index) => (
                                        <VStack
                                            alignItems={"flex-start"}
                                            key={index}
                                        >
                                            <HStack>
                                                <Avatar
                                                    name={review.user.name}
                                                    src={review.user.avatar}
                                                    size="md"
                                                ></Avatar>
                                                <VStack
                                                    align="flex-start"
                                                    spacing={0}
                                                >
                                                    <Heading fontSize={"md"}>
                                                        {review.user.name}
                                                    </Heading>
                                                    <HStack spacing={1}>
                                                        <FaStar size={"12px"} />
                                                        <Text>
                                                            {review.rating}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                            <Text>{review.payload}</Text>
                                        </VStack>
                                    ))}
                                </Grid>
                            </Container>
                        </Box>
                    </Box>
                    <Box pt={10}>
                        <Calendar
                            onChange={setDates as any}
                            prev2Label={null}
                            next2Label={null}
                            minDetail="month"
                            minDate={new Date()}
                            maxDate={
                                new Date(
                                    Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000
                                )
                            }
                            selectRange
                        />
                        <Button
                            isLoading={isCheckingBooking}
                            isDisabled={!checkBookingData?.ok}
                            mt={5}
                            w="100%"
                            colorScheme={"red"}
                        >
                            Make booking
                        </Button>
                        {!checkBookingData?.ok && !isCheckingBooking ? (
                            <Text color={"red.500"}>
                                Can't book on those dates, sorry.
                            </Text>
                        ) : null}
                    </Box>
                </Grid>
            </Box>
        </>
    );
}
